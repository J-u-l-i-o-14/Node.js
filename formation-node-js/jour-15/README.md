# API ToDo avec Authentification JWT

Projet final de la Semaine 3 - Formation Node.js intensive

## 📋 Fonctionnalités

- ✅ Authentification JWT (Inscription, Connexion, Profil)
- ✅ Gestion de tâches avec propriété utilisateur
- ✅ Chaque utilisateur voit uniquement ses propres tâches
- ✅ Protection des routes avec middleware JWT
- ✅ Documentation Swagger interactive
- ✅ Configuration centralisée des variables d'environnement

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/formation-node
JWT_SECRET=votre_secret_super_securise
JWT_EXPIRE=30d
```

## 🏃 Démarrage

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📚 Documentation API

Accédez à la documentation Swagger interactive :
```
http://localhost:3000/api-docs
```

## 🔐 Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur (protégé)

### Tâches (toutes protégées)

- `GET /api/tasks` - Liste des tâches de l'utilisateur
- `GET /api/tasks/:id` - Détail d'une tâche
- `POST /api/tasks` - Créer une tâche
- `PUT /api/tasks/:id` - Modifier une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

## 🧪 Test avec Swagger

1. Allez sur `/api-docs`
2. Créez un compte via `POST /api/auth/register`
3. Copiez le token reçu
4. Cliquez sur **Authorize** (🔒) en haut
5. Collez le token
6. Testez les routes protégées !

## 🏗️ Architecture

```
src/
├── config/
│   ├── db.js          # Connexion MongoDB
│   └── env.js         # Variables d'environnement centralisées
├── models/
│   ├── User.js        # Modèle utilisateur
│   └── Task.js        # Modèle tâche (lié à User)
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── auth.js        # Middleware de protection JWT
├── routes/
│   ├── auth.js
│   └── tasks.js
└── app.js             # Point d'entrée
```

## 🔒 Sécurité

- Mots de passe hachés avec bcrypt (10 rounds)
- Tokens JWT signés avec clé secrète
- Vérification de propriété sur toutes les opérations CRUD
- Variables sensibles dans `.env` (non versionné)
- Configuration centralisée pour éviter les erreurs

## 💡 Améliorations apportées

### Configuration centralisée (`src/config/env.js`)

Au lieu de répéter `process.env.JWT_SECRET` partout, nous importons maintenant :

```javascript
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');
```

**Avantages :**
- Code plus propre et lisible
- Valeurs par défaut centralisées
- Facilite les tests (mock d'un seul fichier)
- Autocomplete dans l'IDE
