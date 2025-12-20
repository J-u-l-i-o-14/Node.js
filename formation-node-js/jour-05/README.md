# Projet Semaine 1 - Serveur Web Node.js

Ce projet marque la fin de la première semaine de formation intensive Node.js. Il s'agit d'un serveur web statique capable de servir plusieurs pages HTML et de gérer les erreurs 404.

## Fonctionnalités

- Serveur HTTP natif (sans Express)
- Gestion du routing basique (`/`, `/about`, `/contact`)
- Gestion des fichiers statiques (HTML, CSS)
- Page 404 personnalisée
- Utilisation du module `path` pour la gestion des chemins
- Utilisation du module `fs` pour la lecture des fichiers

## Installation

1. Cloner le repo (si applicable)
2. Installer les dépendances :
   ```bash
   npm install
   ```

## Démarrage

Pour lancer le serveur en mode développement (avec redémarrage automatique) :

```bash
npm run dev
```

Le serveur sera accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

- `server.js` : Le point d'entrée de l'application (le serveur).
- `public/` : Dossier contenant les fichiers statiques.
  - `index.html` : Page d'accueil.
  - `about.html` : Page À propos.
  - `contact.html` : Page Contact.
  - `404.html` : Page d'erreur.
  - `style.css` : Styles globaux.
