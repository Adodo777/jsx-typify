---
name: Rapport de bug
about: Créer un rapport pour nous aider à améliorer jsx-typify
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ['Adodo777']

---

## 🐛 Description du bug

Une description claire et concise du bug.

## 🔄 Étapes pour reproduire

1. Aller à '...'
2. Cliquer sur '...'
3. Faire défiler jusqu'à '...'
4. Voir l'erreur

## ✅ Comportement attendu

Une description claire de ce qui devrait se passer.

## ❌ Comportement actuel

Une description de ce qui se passe actuellement.

## 📋 Environnement

- **OS** : [ex: Windows 10, macOS, Linux]
- **Node.js** : [ex: 16.14.0]
- **jsx-typify** : [ex: 1.0.0]
- **Navigateur** : [ex: Chrome, Firefox, Safari] (si applicable)

## 💻 Exemple de code

```jsx
// Code minimal pour reproduire le bug
MyComponent.type({
  name: Required(String),
  status: Enum(['active', 'inactive'])
});

MyComponent.defaults({
  name: 'John',
  status: 'active'
});
```

## 📸 Captures d'écran

Si applicable, ajoutez des captures d'écran pour aider à expliquer votre problème.

## 📝 Logs

Si vous avez des logs d'erreur, partagez-les ici :

```
[Logs d'erreur ici]
```

## 🔍 Informations supplémentaires

Ajoutez tout autre contexte, exemples, ou informations qui pourraient être utiles.

## ✅ Checklist

- [ ] J'ai vérifié que ce bug n'a pas déjà été rapporté
- [ ] J'ai testé avec la dernière version de jsx-typify
- [ ] J'ai fourni un exemple minimal pour reproduire le bug
- [ ] J'ai inclus toutes les informations d'environnement pertinentes 