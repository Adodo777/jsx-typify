const fs = require('fs-extra');

/**
 * Formate un type de prop pour l'affichage dans la documentation
 * @param {Object} propInfo - Informations sur la propriété
 * @returns {string} Type formaté
 */
function formatPropType(propInfo) {
  switch (propInfo.type) {
    case 'simple':
      return `\`${propInfo.baseType}\``;
    case 'array':
      return `\`Array<${propInfo.elementType}>\``;
    case 'shape':
      return `\`Object\` avec structure`;
    case 'event':
      return `\`Function\` (${propInfo.eventType})`;
    case 'enum':
      return `\`Enum\` [${propInfo.values.join(', ')}]`;
    case 'required':
      return `\`${propInfo.baseType}\` (requis)`;
    default:
      return `\`${propInfo.type}\``;
  }
}

/**
 * Génère la documentation Markdown pour un composant
 * @param {Object} componentDoc - Documentation du composant
 * @returns {string} Documentation Markdown
 */
function generateMarkdownDoc(componentDoc) {
  let md = `# ${componentDoc.name}\n\n`;
  md += `## Props\n\n`;
  md += `| Nom | Type | Requis | Description |\n`;
  md += `|-----|------|--------|-------------|\n`;

  Object.entries(componentDoc.props).forEach(([propName, propInfo]) => {
    const type = formatPropType(propInfo);
    const required = propInfo.required ? '✅' : '❌';
    const defaultValue = componentDoc.defaults[propName] ? 
      `\`${componentDoc.defaults[propName].value}\`` : '-';
    
    md += `| \`${propName}\` | ${type} | ${required} | ${defaultValue} |\n`;
  });

  if (Object.keys(componentDoc.defaults).length > 0) {
    md += `\n## Valeurs par défaut\n\n`;
    Object.entries(componentDoc.defaults).forEach(([propName, defaultInfo]) => {
      md += `- \`${propName}\`: \`${defaultInfo.value}\`\n`;
    });
  }

  md += `\n---\n*Documentation générée automatiquement*\n`;
  
  return md;
}

/**
 * Génère la documentation JSON pour un composant
 * @param {Object} componentDoc - Documentation du composant
 * @returns {Object} Documentation JSON
 */
function generateJsonDoc(componentDoc) {
  return {
    component: componentDoc.name,
    props: componentDoc.props,
    defaults: componentDoc.defaults,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Génère la documentation TypeScript pour un composant
 * @param {Object} componentDoc - Documentation du composant
 * @returns {string} Documentation TypeScript
 */
function generateTypeScriptDoc(componentDoc) {
  let ts = `// Types pour ${componentDoc.name}\n\n`;
  ts += `interface ${componentDoc.name}Props {\n`;

  Object.entries(componentDoc.props).forEach(([propName, propInfo]) => {
    const required = propInfo.required ? '' : '?';
    let type = 'any';

    switch (propInfo.type) {
      case 'simple':
        type = propInfo.baseType.toLowerCase();
        break;
      case 'array':
        type = `${propInfo.elementType.toLowerCase()}[]`;
        break;
      case 'shape':
        type = 'object';
        break;
      case 'event':
        type = 'Function';
        break;
      case 'enum':
        type = propInfo.values.map(v => `'${v}'`).join(' | ');
        break;
      case 'required':
        type = propInfo.baseType.toLowerCase();
        break;
    }

    ts += `  ${propName}${required}: ${type};\n`;
  });

  ts += `}\n\n`;
  ts += `export default ${componentDoc.name}Props;\n`;
  
  return ts;
}

/**
 * Génère la documentation JSDoc pour un composant
 * @param {Object} componentDoc - Documentation du composant
 * @returns {string} Documentation JSDoc
 */
function generateJSDoc(componentDoc) {
  let jsdoc = `/**\n`;
  jsdoc += ` * ${componentDoc.name}\n`;
  jsdoc += ` * @description Composant React avec PropTypes automatiques\n`;
  jsdoc += ` *\n`;

  Object.entries(componentDoc.props).forEach(([propName, propInfo]) => {
    const required = propInfo.required ? ' (requis)' : '';
    let type = 'any';

    switch (propInfo.type) {
      case 'simple':
        type = propInfo.baseType.toLowerCase();
        break;
      case 'array':
        type = `${propInfo.elementType.toLowerCase()}[]`;
        break;
      case 'shape':
        type = 'object';
        break;
      case 'event':
        type = 'function';
        break;
      case 'enum':
        type = propInfo.values.map(v => `'${v}'`).join('|');
        break;
      case 'required':
        type = propInfo.baseType.toLowerCase();
        break;
    }

    jsdoc += ` * @param {${type}} props.${propName} - ${propName}${required}\n`;
  });

  jsdoc += ` */\n`;
  
  return jsdoc;
}

/**
 * Génère tous les types de documentation pour un composant
 * @param {Object} componentDoc - Documentation du composant
 * @param {string} filepath - Chemin du fichier source
 */
function generateDocumentation(componentDoc, filepath) {
  if (!componentDoc.name) return;

  const basePath = filepath.replace('.jsx', '');
  
  // Documentation JSON
  const jsonDoc = generateJsonDoc(componentDoc);
  fs.writeFileSync(`${basePath}.props.json`, JSON.stringify(jsonDoc, null, 2));

  // Documentation Markdown
  const markdownDoc = generateMarkdownDoc(componentDoc);
  fs.writeFileSync(`${basePath}.props.md`, markdownDoc);

  // Documentation TypeScript
  const typescriptDoc = generateTypeScriptDoc(componentDoc);
  fs.writeFileSync(`${basePath}.props.d.ts`, typescriptDoc);

  // Documentation JSDoc
  const jsdocDoc = generateJSDoc(componentDoc);
  fs.writeFileSync(`${basePath}.props.jsdoc`, jsdocDoc);
}

module.exports = {
  generateDocumentation,
  generateMarkdownDoc,
  generateJsonDoc,
  generateTypeScriptDoc,
  generateJSDoc,
  formatPropType
}; 