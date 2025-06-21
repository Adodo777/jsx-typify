#!/usr/bin/env node

const path = require('path');
const { injectPropTypes, injectPropTypesFromDirectory } = require('../typify/parse');

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage : jsx-typify <fichier|dossier> [pattern]

Exemples :
  jsx-typify ./src/MonComposant.jsx
  jsx-typify ./src
  jsx-typify ./src "**/*.jsx"
`);
  process.exit(0);
}

const target = args[0];
const pattern = args[1] || '**/*.jsx';
const fs = require('fs');

if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
  // Dossier : batch
  const result = injectPropTypesFromDirectory(target, pattern);
  console.log(`\n✅ Fichiers traités : ${result.success.length}`);
  if (result.errors.length > 0) {
    console.error(`❌ Erreurs :`);
    result.errors.forEach(e => console.error(`- ${e.filepath}: ${e.error}`));
  }
} else if (fs.existsSync(target)) {
  // Fichier unique
  injectPropTypes(target);
} else {
  console.error(`❌ Chemin introuvable : ${target}`);
  process.exit(1);
} 