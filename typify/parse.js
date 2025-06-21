const fs = require('fs-extra');
const generator = require('@babel/generator').default;
const { parseJSXFile } = require('./parser');
const { generateDocumentation } = require('./docGenerator');

function injectPropTypes(filepath) {
  try {
    const {
      ast,
      componentName,
      propTypesExpression,
      defaultPropsExpression,
      propsDoc,
      defaultsDoc
    } = parseJSXFile(filepath);

    // Injecte les PropTypes si disponibles
    if (propTypesExpression) {
      const traverse = require('@babel/traverse').default;
      let inserted = false;
      traverse(ast, {
        ExportDefaultDeclaration(path) {
          if (!inserted && propTypesExpression) {
            path.insertAfter(propTypesExpression);
            inserted = true;
          }
        }
      });
      if (!inserted && propTypesExpression) {
        ast.program.body.push(propTypesExpression);
      }
    }

    // Injecte les defaultProps si disponibles
    if (defaultPropsExpression) {
      const traverse = require('@babel/traverse').default;
      let inserted = false;
      traverse(ast, {
        ExpressionStatement(path) {
          if (
            !inserted &&
            defaultPropsExpression &&
            path.node.expression &&
            path.node.expression.left &&
            path.node.expression.left.property &&
            path.node.expression.left.property.name === 'propTypes'
          ) {
            path.insertAfter(defaultPropsExpression);
            inserted = true;
          }
        }
      });
      if (!inserted && defaultPropsExpression) {
        ast.program.body.push(defaultPropsExpression);
      }
    }

    const { code: output } = generator(ast, {
      retainLines: true,
      compact: false,
      jsescOption: { minimal: true }
    });
    fs.writeFileSync(filepath.replace('.jsx', '.typed.jsx'), output);

    if (componentName) {
      const componentDoc = {
        name: componentName,
        props: propsDoc,
        defaults: defaultsDoc
      };
      generateDocumentation(componentDoc, filepath);
    }
    console.log(`✅ Transformation réussie pour ${filepath}`);
  } catch (error) {
    console.error(`❌ Erreur lors de la transformation de ${filepath}:`, error.message);
    throw error;
  }
}

function injectPropTypesBatch(filepaths) {
  const results = { success: [], errors: [] };
  filepaths.forEach(filepath => {
    try {
      injectPropTypes(filepath);
      results.success.push(filepath);
    } catch (error) {
      results.errors.push({ filepath, error: error.message });
    }
  });
  return results;
}

function injectPropTypesFromDirectory(directory, pattern = '**/*.jsx') {
  const glob = require('glob');
  const files = glob.sync(pattern, { cwd: directory });
  const fullPaths = files.map(file => `${directory}/${file}`);
  return injectPropTypesBatch(fullPaths);
}

module.exports = {
  injectPropTypes,
  injectPropTypesBatch,
  injectPropTypesFromDirectory
}; 