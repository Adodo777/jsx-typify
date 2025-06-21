# Guide de Configuration GitHub

Ce guide vous aide à configurer complètement votre repository GitHub pour jsx-typify.

## 🔐 1. Configuration des Secrets

### NPM_TOKEN (Obligatoire)
1. Allez sur [npmjs.com](https://www.npmjs.com) et connectez-vous
2. Cliquez sur votre avatar → **Access Tokens**
3. Cliquez sur **Generate New Token** → **Automation**
4. Copiez le token généré
5. Dans GitHub : **Settings** → **Secrets and variables** → **Actions**
6. Cliquez sur **New repository secret**
7. Nom : `NPM_TOKEN`
8. Valeur : collez le token npm

## ⚙️ 2. Configuration des Paramètres

### Activer les Discussions
1. **Settings** → **Features**
2. Activez **Discussions**
3. Cliquez sur **Set up discussions**

### Configurer les Actions
1. **Settings** → **Actions** → **General**
2. Dans **Workflow permissions** :
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

### Configurer les Issues
1. **Settings** → **Features**
2. Activez **Issues**
3. Dans **Issues** → **General** :
   - ✅ **Allow users to contact repository maintainers**
   - ✅ **Allow users to request access**

## 🛡️ 3. Configuration des Règles de Protection des Branches

### Méthode Manuelle
1. **Settings** → **Branches**
2. Cliquez sur **Add rule** pour `main`
3. Configurez :
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Include administrators**
   - ✅ **Require conversation resolution before merging**
   - ✅ **Require code owner reviews**

### Méthode Automatique
Utilisez le fichier `.github/branch-protection-rules.json` ou exécutez :
```bash
node scripts/apply-branch-protection.js
```

## 🏷️ 4. Configuration des Labels

### Méthode Manuelle
1. **Issues** → **Labels**
2. Créez chaque label avec les couleurs définies dans `.github/labels.yml`

### Méthode Automatique
Exécutez le script :
```bash
node scripts/setup-github.js
```

## 🔧 5. Configuration des Workflows

Les workflows sont déjà configurés dans `.github/workflows/` :
- `ci.yml` : Tests et validation
- `publish.yml` : Publication sur npm

## 📋 6. Checklist de Configuration

- [ ] NPM_TOKEN configuré
- [ ] Discussions activées
- [ ] Actions configurées
- [ ] Issues configurées
- [ ] Règles de protection des branches configurées
- [ ] Labels créés
- [ ] Workflows fonctionnels

## 🔗 7. Liens Utiles

- **Repository** : https://github.com/Adodo777/jsx-typify
- **Settings** : https://github.com/Adodo777/jsx-typify/settings
- **Actions** : https://github.com/Adodo777/jsx-typify/actions
- **Issues** : https://github.com/Adodo777/jsx-typify/issues
- **Discussions** : https://github.com/Adodo777/jsx-typify/discussions
- **Labels** : https://github.com/Adodo777/jsx-typify/labels
- **Branches** : https://github.com/Adodo777/jsx-typify/settings/branches

## 🚀 8. Test de Configuration

Après configuration, testez en :
1. Créant une issue avec un template
2. Créant une Pull Request
3. Vérifiant que les Actions se déclenchent
4. Testant la publication sur npm

## 📞 9. Support

Si vous rencontrez des problèmes :
- Ouvrez une issue sur GitHub
- Contactez : marcos.adodo@gmail.com
- Consultez la documentation GitHub 