# Guide de Contribution

Merci de votre intérêt pour contribuer à `jsx-typify` ! 🎉

## Table des matières

- [Comment contribuer](#comment-contribuer)
- [Configuration de l'environnement](#configuration-de-lenvironnement)
- [Structure du projet](#structure-du-projet)
- [Bonnes pratiques](#bonnes-pratiques)
- [Processus de Pull Request](#processus-de-pull-request)
- [Rapport de bugs](#rapport-de-bugs)
- [Demande de fonctionnalités](#demande-de-fonctionnalités)

## Comment contribuer

### Types de contributions acceptées

- 🐛 **Correction de bugs**
- ✨ **Nouvelles fonctionnalités**
- 📚 **Amélioration de la documentation**
- 🧪 **Ajout de tests**
- 🔧 **Amélioration du code**
- 🌍 **Traductions**

### Avant de commencer

1. Vérifiez s'il existe déjà une issue pour votre contribution
2. Si vous ajoutez une fonctionnalité, créez d'abord une issue pour en discuter
3. Assurez-vous que votre contribution respecte les bonnes pratiques

## Configuration de l'environnement

### Prérequis

- Node.js ≥ 14
- npm ou yarn
- Git

### Installation

```bash
# Fork et clone le repository
git clone https://github.com/VOTRE_USERNAME/jsx-typify.git
cd jsx-typify

# Installer les dépendances
npm install

# Lier votre fork au repository original
git remote add upstream https://github.com/Adodo777/jsx-typify.git
```

### Test local

```bash
# Tester l'exemple fourni
node example/run-example.js

# Tester le CLI
node bin/jsx-typify.js --help
```

## Structure du projet

```
jsx-typify/
├── bin/                    # CLI executable
│   └── jsx-typify.js
├── typify/                 # Modules principaux
│   ├── parse.js           # Point d'entrée principal
│   ├── parser.js          # Parsing et extraction AST
│   ├── propTypeGenerator.js # Génération PropTypes
│   ├── defaultPropGenerator.js # Génération defaultProps
│   ├── docGenerator.js    # Génération documentation
│   └── typeMapping.js     # Mapping des types
├── example/               # Exemples d'utilisation
│   ├── SimpleComponent.jsx
│   └── run-example.js
├── src/                   # Dossier pour vos tests
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── package.json
```

## Bonnes pratiques

### Code

- **Respectez la structure modulaire** : chaque module a une responsabilité claire
- **Ajoutez des commentaires JSDoc** pour les fonctions complexes
- **Utilisez des noms de variables/fonctions explicites**
- **Testez vos modifications** avant de soumettre

### Commits

- **Messages de commit clairs** : utilisez le format conventionnel
- **Commits atomiques** : un commit = une modification logique
- **Exemples de messages** :
  ```
  feat: add support for custom PropTypes
  fix: resolve issue with enum values parsing
  docs: update README with new examples
  refactor: improve error handling in parser
  ```

### Tests

- **Testez vos nouvelles fonctionnalités** avec des exemples
- **Vérifiez que les anciennes fonctionnalités** fonctionnent toujours
- **Ajoutez des tests si possible** pour les cas complexes

## Processus de Pull Request

### 1. Préparation

```bash
# Créer une branche pour votre contribution
git checkout -b feature/nouvelle-fonctionnalite

# Faire vos modifications
# ...

# Ajouter vos fichiers
git add .

# Commiter avec un message clair
git commit -m "feat: add new feature description"
```

### 2. Soumission

```bash
# Pousser votre branche
git push origin feature/nouvelle-fonctionnalite

# Créer la Pull Request sur GitHub
```

### 3. Template de Pull Request

Utilisez ce template pour votre PR :

```markdown
## Description
Brève description de vos modifications

## Type de changement
- [ ] Correction de bug
- [ ] Nouvelle fonctionnalité
- [ ] Amélioration de la documentation
- [ ] Autre (précisez)

## Tests
- [ ] J'ai testé mes modifications
- [ ] Les tests existants passent toujours
- [ ] J'ai ajouté des tests si nécessaire

## Checklist
- [ ] Mon code respecte les bonnes pratiques
- [ ] J'ai mis à jour la documentation si nécessaire
- [ ] J'ai ajouté des exemples si applicable
- [ ] Mes commits sont clairs et atomiques

## Screenshots (si applicable)
Ajoutez des captures d'écran si votre PR modifie l'interface
```

## Rapport de bugs

### Avant de rapporter un bug

1. Vérifiez que le bug n'a pas déjà été rapporté
2. Testez avec la dernière version
3. Préparez un exemple minimal pour reproduire le bug

### Template de rapport de bug

```markdown
## Description du bug
Description claire et concise du bug

## Étapes pour reproduire
1. Aller à '...'
2. Cliquer sur '...'
3. Faire défiler jusqu'à '...'
4. Voir l'erreur

## Comportement attendu
Description de ce qui devrait se passer

## Comportement actuel
Description de ce qui se passe actuellement

## Environnement
- OS: [ex: Windows 10, macOS, Linux]
- Node.js: [ex: 16.14.0]
- jsx-typify: [ex: 1.0.0]

## Exemple de code
```jsx
// Code minimal pour reproduire le bug
MyComponent.type({
  // ...
});
```

## Informations supplémentaires
Ajoutez tout autre contexte, logs, screenshots, etc.
```

## Demande de fonctionnalités

### Template de demande de fonctionnalité

```markdown
## Problème
Description claire du problème que cette fonctionnalité résoudrait

## Solution proposée
Description de la solution que vous aimeriez voir

## Alternatives considérées
Description des alternatives que vous avez considérées

## Informations supplémentaires
Ajoutez tout autre contexte, exemples, etc.
```

## Contact

Si vous avez des questions ou besoin d'aide :

- 📧 Email : marcos.adodo@gmail.com
- 🐛 Issues : [GitHub Issues](https://github.com/Adodo777/jsx-typify/issues)
- 💬 Discussions : [GitHub Discussions](https://github.com/Adodo777/jsx-typify/discussions)

## Remerciements

Merci à tous les contributeurs qui rendent ce projet meilleur ! 🙏

---

**N'oubliez pas : chaque contribution, même petite, est appréciée !** 🌟 