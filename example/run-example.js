const { injectPropTypes } = require('../typify/parse.js');

console.log('🚀 Exemple d\'utilisation de jsx-typify');
console.log('=====================================\n');

try {
  // Transforme le composant d'exemple
  injectPropTypes('./example/SimpleComponent.jsx');
  
  console.log('✅ Transformation réussie !');
  console.log('📁 Fichiers générés :');
  console.log('   • example/SimpleComponent.typed.jsx');
  console.log('   • example/SimpleComponent.props.md');
  console.log('   • example/SimpleComponent.props.json');
  console.log('   • example/SimpleComponent.props.d.ts');
  console.log('   • example/SimpleComponent.props.jsdoc');
  
  console.log('\n🎯 Fonctionnalités démontrées :');
  console.log('   • Types simples : String, Number, Boolean');
  console.log('   • Événements DOM : Event(\'ClickEvent\')');
  console.log('   • Objets avec structure : { name: String, email: String }');
  console.log('   • Tableaux typés : [String]');
  console.log('   • Valeurs par défaut : .defaults({ ... })');
  
} catch (error) {
  console.error('❌ Erreur lors de la transformation:', error.message);
} 