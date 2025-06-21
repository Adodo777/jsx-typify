const path = require('path');
const { injectPropTypes } = require('../typify/parse.js');

console.log('🚀 Test CI - Exemple d\'utilisation de jsx-typify');
console.log('===============================================\n');

try {
  // Utiliser des chemins absolus pour éviter les problèmes de répertoire
  const currentDir = process.cwd();
  const exampleFile = path.join(currentDir, 'example', 'SimpleComponent.jsx');
  
  console.log('📁 Répertoire de travail:', currentDir);
  console.log('📄 Fichier à traiter:', exampleFile);
  
  // Vérifier que le fichier existe
  const fs = require('fs');
  if (!fs.existsSync(exampleFile)) {
    throw new Error(`Fichier non trouvé: ${exampleFile}`);
  }
  
  // Transforme le composant d'exemple
  injectPropTypes(exampleFile);
  
  console.log('✅ Transformation réussie !');
  
  // Vérifier que les fichiers ont été générés
  const generatedFiles = [
    'example/SimpleComponent.typed.jsx',
    'example/SimpleComponent.props.md',
    'example/SimpleComponent.props.json',
    'example/SimpleComponent.props.d.ts',
    'example/SimpleComponent.props.jsdoc'
  ];
  
  console.log('📁 Fichiers générés :');
  generatedFiles.forEach(file => {
    const fullPath = path.join(currentDir, file);
    if (fs.existsSync(fullPath)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ ${file} (manquant)`);
      throw new Error(`Fichier généré manquant: ${file}`);
    }
  });
  
  console.log('\n🎯 Fonctionnalités démontrées :');
  console.log('   • Types simples : String, Number, Boolean');
  console.log('   • Événements DOM : Event(\'ClickEvent\')');
  console.log('   • Objets avec structure : { name: String, email: String }');
  console.log('   • Tableaux typés : [String]');
  console.log('   • Valeurs par défaut : .defaults({ ... })');
  
} catch (error) {
  console.error('❌ Erreur lors de la transformation:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
} 