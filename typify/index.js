#!/usr/bin/env node

const path = require('path');
const { injectPropTypes } = require('./parse');

const args = process.argv.slice(2);
const filePath = args[0];

if (!filePath) {
  console.error('❌ Merci d’indiquer un fichier à typifier.');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), filePath);
injectPropTypes(fullPath);
console.log(`✅ Typage injecté : ${filePath.replace('.jsx', '.typed.jsx')}`);
