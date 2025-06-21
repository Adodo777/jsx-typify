# Actions GitHub personnalisées

Ce dossier contient les actions GitHub réutilisables pour jsx-typify.

## Actions disponibles

### setup-node
Configuration standard de Node.js avec cache npm.

### run-tests
Exécution des tests avec vérification des fichiers générés.

### security-check
Vérification de sécurité avec npm audit.

### publish-npm
Publication automatique sur npm avec tests préalables.

## Utilisation

Ces actions sont utilisées dans les workflows CI/CD :

- `.github/workflows/ci.yml` - Tests et validation
- `.github/workflows/publish.yml` - Publication sur npm

## Configuration

Chaque action peut être configurée via des paramètres d'entrée. Voir les fichiers de workflow pour les exemples d'utilisation. 