# jsx-typify

[![npm version](https://badge.fury.io/js/jsx-typify.svg)](https://badge.fury.io/js/jsx-typify)
[![npm downloads](https://img.shields.io/npm/dm/jsx-typify.svg)](https://www.npmjs.com/package/jsx-typify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Adodo777/jsx-typify.svg)](https://github.com/Adodo777/jsx-typify)
[![GitHub issues](https://img.shields.io/github/issues/Adodo777/jsx-typify.svg)](https://github.com/Adodo777/jsx-typify/issues)
[![CI](https://github.com/Adodo777/jsx-typify/actions/workflows/ci.yml/badge.svg)](https://github.com/Adodo777/jsx-typify/actions/workflows/ci.yml)
[![Publish](https://github.com/Adodo777/jsx-typify/actions/workflows/publish.yml/badge.svg)](https://github.com/Adodo777/jsx-typify/actions/workflows/publish.yml)

**Générateur automatique de PropTypes, defaultProps et documentation pour vos composants React en JSX.**

---

## Sommaire
- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Syntaxe supportée](#syntaxe-supportée)
- [Architecture du code](#architecture-du-code)
- [Exemples](#exemples)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [FAQ (Questions fréquentes)](#faq-questions-fréquentes)
- [Support & Contact](#support--contact)

---

## Présentation

`jsx-typify` permet d'ajouter automatiquement des PropTypes, des defaultProps et de générer une documentation complète (Markdown, JSON, TypeScript, JSDoc) à partir d'annotations simples dans vos fichiers JSX.

---

## Fonctionnalités

- Génération automatique de `propTypes` et `defaultProps`
- Support des types avancés : `Enum`, `Required`, `Event`, `shape`, `arrayOf`, etc.
- Génération de documentation :  
  - Markdown (`.props.md`)
  - JSON (`.props.json`)
  - TypeScript (`.props.d.ts`)
  - JSDoc (`.props.jsdoc`)
- Utilisation simple par script ou en batch sur un dossier

---

## Installation

```bash
npm install jsx-typify
# ou
yarn add jsx-typify
```

Assurez-vous d'avoir Node.js ≥ 14.

---

## Utilisation

### 1. Annoter vos composants

```jsx
MyComponent.type({
  name: Required(String),
  status: Enum(['active', 'inactive']),
  onClick: Event('ClickEvent'),
  user: {
    id: String,
    email: String
  },
  tags: [String]
});

MyComponent.defaults({
  name: 'John',
  status: 'active',
  tags: ['default']
});
```

### 2. Lancer la transformation

```bash
# Utilisation directe avec npx
npx jsx-typify ./src/MonComposant.jsx

# Ou installation globale
npm install -g jsx-typify
jsx-typify ./src/MonComposant.jsx

# Ou en tant que module
node example/run-example.js
```

Ou utilisez le module dans votre propre script :

```js
const { injectPropTypes } = require('jsx-typify');
injectPropTypes('./src/MonComposant.jsx');
```

---

## Syntaxe supportée

- **Types simples** : `String`, `Number`, `Boolean`, `Object`, `Array`, `Node`, `Element`
- **Enum** : `Enum(['val1', 'val2'])`
- **Required** : `Required(Type)` ou `Required(Enum([...]))`
- **Event** : `Event('ClickEvent')`, `Event('ChangeEvent')`, etc.
- **Shape** : `{ prop: Type, ... }`
- **Array** : `[Type]`
- **defaultProps** : `.defaults({ ... })`

---

## Architecture du code

```
typify/
  ├─ parse.js                # Point d'entrée principal (orchestration)
  ├─ parser.js               # Parsing et extraction des infos de l'AST
  ├─ propTypeGenerator.js    # Génération des PropTypes (tous types)
  ├─ defaultPropGenerator.js # Génération des defaultProps et extraction pour la doc
  ├─ docGenerator.js         # Génération de la documentation (MD, JSON, TS, JSDoc)
  └─ typeMapping.js          # Mapping des types simples et DOM
```

Chaque module a une responsabilité claire, facilitant la maintenance et l'extension.

---

## Exemples

### Exemple simple

Voir le dossier `example/` pour un exemple complet :

```bash
node example/run-example.js
```

### Génération de PropTypes

```jsx
UserProfile.type({
  name: Required(String),
  status: Enum(['active', 'inactive']),
  onClick: Event('ClickEvent'),
  user: {
    id: String,
    email: String
  },
  tags: [String]
});
```

Génère automatiquement :

```js
UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['active', 'inactive']),
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  user: PropTypes.shape({ id: PropTypes.string, email: PropTypes.string }),
  tags: PropTypes.arrayOf(PropTypes.string)
};
```

### Génération de documentation

- `UserProfile.props.md` (Markdown)
- `UserProfile.props.json` (JSON)
- `UserProfile.props.d.ts` (TypeScript)
- `UserProfile.props.jsdoc` (JSDoc)

---

## Contribuer

Les contributions sont les bienvenues ! Pour proposer une amélioration ou corriger un bug :

1. **Forkez** le dépôt
2. **Créez une branche** pour votre fonctionnalité ou correction
3. **Ajoutez vos modules ou améliorez l'existant**
4. **Testez** vos modifications
5. **Proposez une Pull Request** claire et documentée

**Bonnes pratiques** :
- Respectez la structure modulaire du projet
- Ajoutez des exemples et/ou des tests si possible
- Documentez toute nouvelle fonctionnalité dans le README

**Contact** : [marcos.adodo@gmail.com]

---

## Licence

Ce projet est sous licence MIT. Vous pouvez l'utiliser, le modifier et le redistribuer librement, même à des fins commerciales, à condition de conserver la mention du copyright.

Auteur : Marcos Adodo — [marcos.adodo@gmail.com](mailto:marcos.adodo@gmail.com)

Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## FAQ (Questions fréquentes)

### Pourquoi utiliser jsx-typify plutôt qu'un autre outil ?
- Il automatise la génération de PropTypes, defaultProps et documentation à partir d'annotations simples, sans surcharger vos composants.
- Il supporte les types avancés, les événements DOM, les enums, la documentation multi-format, et s'intègre facilement dans vos scripts ou CI.

### Est-ce compatible avec TypeScript ?
- jsx-typify génère des fichiers `.d.ts` pour l'autocomplétion et la documentation, mais ne remplace pas un typage TypeScript natif. Il est complémentaire pour les projets JS/JSX.

### Puis-je l'utiliser sur un projet existant ?
- Oui, il suffit d'annoter vos composants et de lancer l'outil sur vos fichiers JSX.

### Comment ajouter un type personnalisé ?
- Pour l'instant, seuls les types standards, enums, shape, arrayOf, et Event sont supportés. Ouvrez une issue pour proposer un nouveau type !

### L'outil modifie-t-il mes fichiers originaux ?
- Non, il génère un fichier `.typed.jsx` à côté de chaque composant source, ainsi que la documentation associée.

### Comment contribuer ?
- Voir le fichier [CONTRIBUTING.md](CONTRIBUTING.md) et les templates de Pull Request.

### Un problème ?
- Ouvrez une [issue](https://github.com/Adodo777/jsx-typify/issues) ou une discussion sur GitHub !

## Support & Contact

- Pour toute question, suggestion ou bug, ouvrez une [issue GitHub](https://github.com/Adodo777/jsx-typify/issues)
- Pour discuter ou proposer des idées, utilisez les [discussions GitHub](https://github.com/Adodo777/jsx-typify/discussions)
- Contact direct : marcos.adodo@gmail.com 