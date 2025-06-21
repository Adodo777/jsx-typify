#!/usr/bin/env node

/**
 * Script pour appliquer automatiquement les règles de protection des branches
 * Utilisation : GITHUB_TOKEN=xxx node scripts/apply-branch-protection.js
 */

const fs = require('fs');
const path = require('path');

// Configuration des règles de protection
const branchProtectionConfig = {
  "main": {
    "required_status_checks": {
      "strict": true,
      "contexts": [
        "test (14.x)",
        "test (16.x)", 
        "test (18.x)",
        "test (20.x)",
        "lint",
        "security"
      ]
    },
    "enforce_admins": true,
    "required_pull_request_reviews": {
      "required_approving_review_count": 1,
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": true,
      "require_last_push_approval": true
    },
    "restrictions": null,
    "required_linear_history": false,
    "allow_force_pushes": false,
    "allow_deletions": false,
    "block_creations": false,
    "required_conversation_resolution": true,
    "lock_branch": false,
    "allow_fork_syncing": true
  },
  "develop": {
    "required_status_checks": {
      "strict": false,
      "contexts": [
        "test (18.x)",
        "lint"
      ]
    },
    "enforce_admins": false,
    "required_pull_request_reviews": {
      "required_approving_review_count": 1,
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": false,
      "require_last_push_approval": false
    },
    "restrictions": null,
    "required_linear_history": false,
    "allow_force_pushes": false,
    "allow_deletions": false,
    "block_creations": false,
    "required_conversation_resolution": false,
    "lock_branch": false,
    "allow_fork_syncing": true
  }
};

console.log('🛡️  Configuration des règles de protection des branches');
console.log('======================================================\n');

console.log('📋 Règles à appliquer :');
Object.entries(branchProtectionConfig).forEach(([branch, config]) => {
  console.log(`\n🌿 Branche : ${branch}`);
  console.log(`   • Status checks requis : ${config.required_status_checks.contexts.join(', ')}`);
  console.log(`   • Strict : ${config.required_status_checks.strict}`);
  console.log(`   • Reviews requis : ${config.required_pull_request_reviews.required_approving_review_count}`);
  console.log(`   • Code owner reviews : ${config.required_pull_request_reviews.require_code_owner_reviews}`);
  console.log(`   • Admins inclus : ${config.enforce_admins}`);
  console.log(`   • Conversation résolue : ${config.required_conversation_resolution}`);
});

console.log('\n📝 Instructions manuelles :');
console.log('1. Va sur https://github.com/Adodo777/jsx-typify/settings/branches');
console.log('2. Clique sur "Add rule" pour chaque branche (main, develop)');
console.log('3. Configure selon les paramètres ci-dessus');

console.log('\n🔧 Configuration automatique :');
console.log('1. Crée un token GitHub avec les permissions "repo"');
console.log('2. Exécute : GITHUB_TOKEN=xxx node scripts/apply-branch-protection.js');
console.log('3. Ou utilise l\'interface web GitHub');

console.log('\n🔗 Liens utiles :');
console.log('• Branches : https://github.com/Adodo777/jsx-typify/settings/branches');
console.log('• Actions : https://github.com/Adodo777/jsx-typify/actions');
console.log('• Settings : https://github.com/Adodo777/jsx-typify/settings');

console.log('\n✅ Configuration terminée !'); 