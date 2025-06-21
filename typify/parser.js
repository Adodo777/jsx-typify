const t = require('@babel/types');
const { generatePropType, generatePropTypesExpression } = require('./propTypeGenerator');
const { processDefaultProps, generateDefaultPropsExpression } = require('./defaultPropGenerator');

/**
 * Extrait les informations de documentation d'une propriété
 * @param {string} propName - Nom de la propriété
 * @param {Object} propValue - Valeur de la propriété (AST)
 * @returns {Object} Informations de documentation
 */
function extractPropDocInfo(propName, propValue) {
  // Si structure d'objet (shape)
  if (t.isObjectExpression(propValue)) {
    return {
      type: 'shape',
      properties: propValue.properties.map(p => ({
        name: p.key.name,
        type: p.value.name
      }))
    };
  }

  // Si tableau de type
  else if (t.isArrayExpression(propValue)) {
    const elementType = propValue.elements[0];
    if (elementType && t.isIdentifier(elementType)) {
      return {
        type: 'array',
        elementType: elementType.name
      };
    }
  }

  // Si c'est un appel à Event("ClickEvent")
  else if (
    t.isCallExpression(propValue) &&
    t.isIdentifier(propValue.callee) &&
    propValue.callee.name === 'Event'
  ) {
    const eventType = propValue.arguments[0];
    if (eventType && t.isStringLiteral(eventType)) {
      return {
        type: 'event',
        eventType: eventType.value
      };
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
      return {
        type: 'enum',
        values: values
      };
    }
  }

  // Si c'est un appel à Required(Type)
  else if (
    t.isCallExpression(propValue) &&
    t.isIdentifier(propValue.callee) &&
    propValue.callee.name === 'Required'
  ) {
    const requiredType = propValue.arguments[0];
    let baseType = 'unknown';

    if (t.isIdentifier(requiredType)) {
      baseType = requiredType.name;
    } else if (t.isCallExpression(requiredType) && requiredType.callee.name === 'Enum') {
      baseType = 'enum';
    }

    return {
      type: 'required',
      baseType: baseType,
      required: true
    };
  }

  // Si type simple : String, Boolean, etc.
  else if (t.isIdentifier(propValue)) {
    return {
      type: 'simple',
      baseType: propValue.name,
      required: false
    };
  }

  return {
    type: 'unknown',
    baseType: 'unknown',
    required: false
  };
}

/**
 * Parse les déclarations de types d'un composant
 * @param {Object} args - Arguments de l'appel .type()
 * @returns {Object} PropTypes et documentation
 */
function parseTypeDeclarations(args) {
  const propTypes = {};
  const propsDoc = {};

  if (t.isObjectExpression(args)) {
    args.properties.forEach((prop) => {
      const propName = prop.key.name;
      const propValue = prop.value;

      // Génère le PropTypes
      propTypes[propName] = generatePropType(propName, propValue);

      // Extrait la documentation
      propsDoc[propName] = extractPropDocInfo(propName, propValue);
    });
  }

  return { propTypes, propsDoc };
}

/**
 * Parse les déclarations de valeurs par défaut d'un composant
 * @param {Object} args - Arguments de l'appel .defaults()
 * @returns {Object} DefaultProps et documentation
 */
function parseDefaultDeclarations(args) {
  if (t.isObjectExpression(args)) {
    return processDefaultProps(args.properties);
  }

  return { defaultProps: {}, defaultsDoc: {} };
}

/**
 * Trouve et traite les déclarations .type() dans l'AST
 * @param {Object} ast - AST du fichier
 * @returns {Object} Informations extraites
 */
function findTypeDeclarations(ast) {
  const results = {
    componentName: '',
    propTypes: {},
    propsDoc: {},
    propTypesExpression: null
  };

  const traverse = require('@babel/traverse').default;
  
  traverse(ast, {
    ExpressionStatement(path) {
      const { expression } = path.node;
      
      if (
        t.isCallExpression(expression) &&
        t.isMemberExpression(expression.callee) &&
        expression.callee.property.name === 'type'
      ) {
        const componentName = expression.callee.object.name;
        const args = expression.arguments[0];

        results.componentName = componentName;
        const { propTypes, propsDoc } = parseTypeDeclarations(args);
        
        results.propTypes = propTypes;
        results.propsDoc = propsDoc;
        results.propTypesExpression = generatePropTypesExpression(componentName, propTypes);

        // Supprime la déclaration .type() originale
        path.remove();
      }
    }
  });

  return results;
}

/**
 * Trouve et traite les déclarations .defaults() dans l'AST
 * @param {Object} ast - AST du fichier
 * @returns {Object} Informations extraites
 */
function findDefaultDeclarations(ast) {
  const results = {
    componentName: '',
    defaultProps: {},
    defaultsDoc: {},
    defaultPropsExpression: null
  };

  const traverse = require('@babel/traverse').default;
  
  traverse(ast, {
    ExpressionStatement(path) {
      const { expression } = path.node;
      
      if (
        t.isCallExpression(expression) &&
        t.isMemberExpression(expression.callee) &&
        expression.callee.property.name === 'defaults'
      ) {
        const componentName = expression.callee.object.name;
        const args = expression.arguments[0];

        results.componentName = componentName;
        const { defaultProps, defaultsDoc } = parseDefaultDeclarations(args);
        
        results.defaultProps = defaultProps;
        results.defaultsDoc = defaultsDoc;
        results.defaultPropsExpression = generateDefaultPropsExpression(componentName, defaultProps);

        // Supprime la déclaration .defaults() originale
        path.remove();
      }
    }
  });

  return results;
}

/**
 * Parse un fichier JSX et extrait toutes les informations
 * @param {string} filepath - Chemin du fichier
 * @returns {Object} Informations complètes extraites
 */
function parseJSXFile(filepath) {
  const fs = require('fs-extra');
  const parser = require('@babel/parser');

  const code = fs.readFileSync(filepath, 'utf8');
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const typeResults = findTypeDeclarations(ast);
  const defaultResults = findDefaultDeclarations(ast);

  return {
    ast,
    componentName: typeResults.componentName || defaultResults.componentName,
    propTypes: typeResults.propTypes,
    propsDoc: typeResults.propsDoc,
    propTypesExpression: typeResults.propTypesExpression,
    defaultProps: defaultResults.defaultProps,
    defaultsDoc: defaultResults.defaultsDoc,
    defaultPropsExpression: defaultResults.defaultPropsExpression
  };
}

module.exports = {
  parseJSXFile,
  findTypeDeclarations,
  findDefaultDeclarations,
  parseTypeDeclarations,
  parseDefaultDeclarations,
  extractPropDocInfo
}; 