const t = require('@babel/types');
const { getPropTypeName, getEventTypeName } = require('./typeMapping');

/**
 * Génère un PropTypes pour un type simple
 * @param {string} typeName - Nom du type (ex: 'String', 'Number')
 * @returns {Object} AST du PropTypes
 */
function generateSimplePropType(typeName) {
  return t.memberExpression(
    t.identifier('PropTypes'),
    t.identifier(getPropTypeName(typeName))
  );
}

/**
 * Génère un PropTypes pour un objet avec structure (shape)
 * @param {Array} properties - Propriétés de l'objet
 * @returns {Object} AST du PropTypes.shape
 */
function generateShapePropType(properties) {
  const shapeProperties = properties.map(shapeProp => {
    const shapeKey = shapeProp.key.name;
    const shapeType = shapeProp.value.name;

    return t.objectProperty(
      t.identifier(shapeKey),
      t.memberExpression(
        t.identifier('PropTypes'),
        t.identifier(getPropTypeName(shapeType))
      )
    );
  });

  return t.callExpression(
    t.memberExpression(
      t.identifier('PropTypes'),
      t.identifier('shape')
    ),
    [t.objectExpression(shapeProperties)]
  );
}

/**
 * Génère un PropTypes pour un tableau typé
 * @param {Object} elementType - Type des éléments du tableau
 * @returns {Object} AST du PropTypes.arrayOf
 */
function generateArrayPropType(elementType) {
  if (elementType && t.isIdentifier(elementType)) {
    return t.callExpression(
      t.memberExpression(
        t.identifier('PropTypes'),
        t.identifier('arrayOf')
      ),
      [
        t.memberExpression(
          t.identifier('PropTypes'),
          t.identifier(getPropTypeName(elementType.name))
        )
      ]
    );
  }
  
  return t.memberExpression(
    t.identifier('PropTypes'),
    t.identifier('array')
  );
}

/**
 * Génère un PropTypes pour un événement DOM
 * @param {string} eventType - Type d'événement (ex: 'ClickEvent')
 * @returns {Object} AST du PropTypes.oneOfType
 */
function generateEventPropType(eventType) {
  return t.callExpression(
    t.memberExpression(
      t.identifier('PropTypes'),
      t.identifier('oneOfType')
    ),
    [
      t.arrayExpression([
        t.memberExpression(t.identifier('PropTypes'), t.identifier('func')),
        t.callExpression(
          t.memberExpression(t.identifier('PropTypes'), t.identifier('shape')),
          [t.objectExpression([])]
        )
      ])
    ]
  );
}

/**
 * Génère un PropTypes pour un enum
 * @param {Array} values - Valeurs de l'enum
 * @returns {Object} AST du PropTypes.oneOf
 */
function generateEnumPropType(values) {
  return t.callExpression(
    t.memberExpression(
      t.identifier('PropTypes'),
      t.identifier('oneOf')
    ),
    [t.arrayExpression(values.map(v => t.stringLiteral(v)))]
  );
}

/**
 * Génère un PropTypes requis
 * @param {Object} basePropType - Type de base
 * @returns {Object} AST du PropTypes avec .isRequired
 */
function generateRequiredPropType(basePropType) {
  return t.memberExpression(
    basePropType,
    t.identifier('isRequired')
  );
}

/**
 * Génère un PropTypes pour une propriété donnée
 * @param {string} propName - Nom de la propriété
 * @param {Object} propValue - Valeur de la propriété (AST)
 * @returns {Object} AST du PropTypes généré
 */
function generatePropType(propName, propValue) {
  // Si structure d'objet (shape)
  if (t.isObjectExpression(propValue)) {
    return generateShapePropType(propValue.properties);
  }

  // Si tableau de type
  else if (t.isArrayExpression(propValue)) {
    const elementType = propValue.elements[0];
    return generateArrayPropType(elementType);
  }

  // Si c'est un appel à Event("ClickEvent")
  else if (
    t.isCallExpression(propValue) &&
    t.isIdentifier(propValue.callee) &&
    propValue.callee.name === 'Event'
  ) {
    const eventType = propValue.arguments[0];
    if (eventType && t.isStringLiteral(eventType)) {
      return generateEventPropType(eventType.value);
    }
  }

  // Si c'est un appel à Enum([...])
  else if (
    t.isCallExpression(propValue) &&
    t.isIdentifier(propValue.callee) &&
    propValue.callee.name === 'Enum'
  ) {
    const enumValues = propValue.arguments[0];
    if (enumValues && t.isArrayExpression(enumValues)) {
      const values = enumValues.elements.map(el => 
        t.isStringLiteral(el) ? el.value : el.name
      );
      return generateEnumPropType(values);
    }
  }

  // Si c'est un appel à Required(Type)
  else if (
    t.isCallExpression(propValue) &&
    t.isIdentifier(propValue.callee) &&
    propValue.callee.name === 'Required'
  ) {
    const requiredType = propValue.arguments[0];
    let basePropType;

    if (t.isIdentifier(requiredType)) {
      basePropType = generateSimplePropType(requiredType.name);
    } else if (t.isCallExpression(requiredType) && requiredType.callee.name === 'Enum') {
      const enumValues = requiredType.arguments[0];
      if (enumValues && t.isArrayExpression(enumValues)) {
        const values = enumValues.elements.map(el => 
          t.isStringLiteral(el) ? el.value : el.name
        );
        basePropType = generateEnumPropType(values);
      }
    }

    if (basePropType) {
      return generateRequiredPropType(basePropType);
    }
  }

  // Si type simple : String, Boolean, etc.
  else if (t.isIdentifier(propValue)) {
    return generateSimplePropType(propValue.name);
  }

  // Type par défaut si rien ne correspond
  return generateSimplePropType('Object');
}

/**
 * Génère l'expression PropTypes complète pour un composant
 * @param {string} componentName - Nom du composant
 * @param {Object} propTypes - Objet contenant les PropTypes générés
 * @returns {Object} AST de l'expression PropTypes
 */
function generatePropTypesExpression(componentName, propTypes) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        t.identifier(componentName),
        t.identifier('propTypes')
      ),
      t.objectExpression(
        Object.entries(propTypes).map(([key, val]) =>
          t.objectProperty(t.identifier(key), val)
        )
      )
    )
  );
}

module.exports = {
  generatePropType,
  generatePropTypesExpression,
  generateSimplePropType,
  generateShapePropType,
  generateArrayPropType,
  generateEventPropType,
  generateEnumPropType,
  generateRequiredPropType
}; 