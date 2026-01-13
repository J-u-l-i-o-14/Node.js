# Projet Semaine 2 - API REST ToDo List

Ce projet marque la fin de la deuxième semaine de formation intensive Node.js. Il s'agit d'une API REST complète pour gérer une liste de tâches, construite avec Express.js et suivant une architecture MVC (Model-View-Controller) simplifiée.

## Fonctionnalités

- Architecture modulaire (Routes, Controllers, Models)
- CRUD complet pour les tâches (Create, Read, Update, Delete)
- Logging des requêtes avec `morgan`
- Support Cross-Origin avec `cors`
- Configuration via variables d'environnement (`.env`)

## Installation

1. Installer les dépendances :
   ```bash
   npm install
   ```

## Démarrage

Pour lancer le serveur en mode développement :

```bash
npm run dev
```

Le serveur sera accessible sur [http://localhost:3000](http://localhost:3000).

## Endpoints de l'API

| Méthode | Endpoint       | Description                  |
|---------|-----------------|------------------------------|
| GET     | `/api/tasks`    | Récupérer toutes les tâches  |
| GET     | `/api/tasks/:id`| Récupérer une tâche par ID  |
| POST    | `/api/tasks`   | Créer une nouvelle tâche     |
| PUT     | `/api/tasks/:id`| Mettre à jour une tâche     |
| DELETE  | `/api/tasks/:id`| Supprimer une tâche         |

## Exemple de corps JSON (POST/PUT)

```json
{
  "title": "Apprendre Express",
  "completed": false
}
```
