# jsx-typify

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
npm install
# ou
yarn install
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
node example/run-example.js
```

Ou utilisez le module dans votre propre script :

```js
const { injectPropTypes } = require('./typify/parse.js');
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

MIT 