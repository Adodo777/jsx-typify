#!/usr/bin/env node

/**
 * Script pour configurer automatiquement les labels GitHub
 * Utilisation : node scripts/setup-github.js
 */

const fs = require('fs');
const path = require('path');

// Configuration des labels depuis le fichier .github/labels.yml
const labelsConfig = {
  "bug": { color: "d73a4a", description: "Something isn't working" },
  "enhancement": { color: "a2eeef", description: "New feature or request" },
  "documentation": { color: "0075ca", description: "Improvements or additions to documentation" },
  "good first issue": { color: "7057ff", description: "Good for newcomers" },
  "help wanted": { color: "008672", description: "Extra attention is needed" },
  "invalid": { color: "e4e669", description: "Something is wrong" },
  "question": { color: "d876e3", description: "Further information is requested" },
  "wontfix": { color: "ffffff", description: "This will not be worked on" },
  "dependencies": { color: "0366d6", description: "Pull requests that update a dependency file" },
  "automerge": { color: "0e8a16", description: "Pull requests that can be automatically merged" },
  "needs-triage": { color: "fbca04", description: "Issues that need to be reviewed and categorized" }
};

console.log('🏷️  Configuration des labels GitHub pour jsx-typify');
console.log('==================================================\n');

console.log('📋 Labels à créer :');
Object.entries(labelsConfig).forEach(([name, config]) => {
  console.log(`   • ${name} (${config.color}) - ${config.description}`);
});

console.log('\n📝 Instructions :');
console.log('1. Va sur https://github.com/Adodo777/jsx-typify/labels');
console.log('2. Clique sur "New label" pour chaque label ci-dessus');
console.log('3. Utilise les couleurs et descriptions indiquées');
console.log('4. Ou utilise l\'API GitHub si tu as un token d\'accès');

console.log('\n🔗 Liens utiles :');
console.log('• Labels : https://github.com/Adodo777/jsx-typify/labels');
console.log('• Issues : https://github.com/Adodo777/jsx-typify/issues');
console.log('• Discussions : https://github.com/Adodo777/jsx-typify/discussions');
console.log('• Actions : https://github.com/Adodo777/jsx-typify/actions');
console.log('• Settings : https://github.com/Adodo777/jsx-typify/settings');

console.log('\n✅ Configuration terminée !'); 