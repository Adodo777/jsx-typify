const t = require('@babel/types');

/**
 * Convertit une valeur AST en valeur par défaut
 * @param {Object} propValue - Valeur AST de la propriété
 * @returns {Object|null} AST de la valeur par défaut ou null si non supportée
 */
function convertToDefaultValue(propValue) {
  // String literal
  if (t.isStringLiteral(propValue)) {
    return propValue;
  }
  
  // Numeric literal
  else if (t.isNumericLiteral(propValue)) {
    return propValue;
  }
  
  // Boolean literal
  else if (t.isBooleanLiteral(propValue)) {
    return propValue;
  }
  
  // Null literal
  else if (t.isNullLiteral(propValue)) {
    return propValue;
  }
  
  // Array expression
  else if (t.isArrayExpression(propValue)) {
    return propValue;
  }
  
  // Object expression
  else if (t.isObjectExpression(propValue)) {
    return propValue;
  }
  
  // Undefined identifier
  else if (t.isIdentifier(propValue) && propValue.name === 'undefined') {
    return t.identifier('undefined');
  }
  
  // Template literal
  else if (t.isTemplateLiteral(propValue)) {
    return propValue;
  }
  
  // Binary expression (pour les calculs simples)
  else if (t.isBinaryExpression(propValue)) {
    return propValue;
  }
  
  // Call expression (pour les fonctions comme Date.now())
  else if (t.isCallExpression(propValue)) {
    return propValue;
  }
  
  // Member expression (pour les propriétés d'objets)
  else if (t.isMemberExpression(propValue)) {
    return propValue;
  }
  
  return null;
}

/**
 * Extrait la valeur d'une propriété pour la documentation
 * @param {Object} propValue - Valeur AST de la propriété
 * @returns {any} Valeur extraite
 */
function extractValueForDoc(propValue) {
  if (t.isStringLiteral(propValue)) {
    return propValue.value;
  }
  
  if (t.isNumericLiteral(propValue)) {
    return propValue.value;
  }
  
  if (t.isBooleanLiteral(propValue)) {
    return propValue.value;
  }
  
  if (t.isNullLiteral(propValue)) {
    return null;
  }
  
  if (t.isArrayExpression(propValue)) {
    return propValue.elements.map(extractValueForDoc);
  }
  
  if (t.isObjectExpression(propValue)) {
    const obj = {};
    propValue.properties.forEach(prop => {
      obj[prop.key.name] = extractValueForDoc(prop.value);
    });
    return obj;
  }
  
  if (t.isIdentifier(propValue)) {
    return propValue.name;
  }
  
  if (t.isTemplateLiteral(propValue)) {
    return propValue.quasis.map(q => q.value.raw).join('${}');
  }
  
  return undefined;
}

/**
 * Génère l'expression defaultProps complète pour un composant
 * @param {string} componentName - Nom du composant
 * @param {Object} defaultProps - Objet contenant les valeurs par défaut
 * @returns {Object} AST de l'expression defaultProps
 */
function generateDefaultPropsExpression(componentName, defaultProps) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        t.identifier(componentName),
        t.identifier('defaultProps')
      ),
      t.objectExpression(
        Object.entries(defaultProps).map(([key, val]) =>
          t.objectProperty(t.identifier(key), val)
        )
      )
    )
  );
}

/**
 * Traite les propriétés par défaut d'un objet
 * @param {Array} properties - Propriétés de l'objet defaults
 * @returns {Object} Objet contenant les defaultProps et la documentation
 */
function processDefaultProps(properties) {
  const defaultProps = {};
  const defaultsDoc = {};

  properties.forEach((prop) => {
    const propName = prop.key.name;
    const propValue = prop.value;

    const defaultValue = convertToDefaultValue(propValue);
    if (defaultValue) {
      defaultProps[propName] = defaultValue;
      defaultsDoc[propName] = {
        value: extractValueForDoc(propValue)
      };
    }
  });

  return { defaultProps, defaultsDoc };
}

module.exports = {
  convertToDefaultValue,
  extractValueForDoc,
  generateDefaultPropsExpression,
  processDefaultProps
}; 