# Chat en Temps Réel avec Socket.IO

Jour 16 - Formation Node.js intensive

## 🚀 Qu'est-ce que Socket.IO ?

Socket.IO est une bibliothèque JavaScript qui permet la **communication bidirectionnelle en temps réel** entre le serveur et les clients.

### Différence avec HTTP classique

| HTTP Classique                  | WebSocket (Socket.IO)                             |
|---------------------------------|---------------------------------------------------|
| Client demande → Serveur répond | Connexion permanente bidirectionnelle             |
| Une requête = Une réponse       | Le serveur peut envoyer des données quand il veut |
| Pas de temps réel               | Temps réel instantané                             |

## 📋 Fonctionnalités

- ✅ Chat en temps réel multi-utilisateurs
- ✅ Notifications de connexion/déconnexion
- ✅ Compteur d'utilisateurs en ligne
- ✅ Horodatage des messages
- ✅ Interface moderne et responsive

## 🏃 Installation

```bash
npm install
```

## ⚙️ Démarrage

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 🧪 Test

1. Ouvrez **plusieurs onglets** dans votre navigateur
2. Allez sur `http://localhost:3000` dans chaque onglet
3. Connectez-vous avec des noms différents
4. Envoyez des messages → Ils apparaissent instantanément dans tous les onglets !

## 🔧 Architecture

```
jour-16/
├── server.js          # Serveur Socket.IO
├── public/
│   ├── index.html     # Interface utilisateur
│   ├── style.css      # Design moderne
│   └── app.js         # Client Socket.IO
└── package.json
```

## 📡 Événements Socket.IO

### Serveur → Client

| Événement      | Description                       |
|-----------     |-------------                      |
| `user-joined`  | Un utilisateur a rejoint le chat  |
| `chat-message` | Un message a été envoyé           |
| `user-left`    | Un utilisateur a quitté le chat   |

### Client → Serveur

| Événement      | Description                   |
|-----------     |-------------                  |
| `join`         | Rejoindre le chat avec un nom |
| `chat-message` | Envoyer un message            |
| `disconnect`   | Déconnexion (automatique)     |

## 💡 Concepts clés

### 1. Connexion au serveur

**Serveur :**
```javascript
io.on('connection', (socket) => {
    console.log('Utilisateur connecté:', socket.id);
});
```

**Client :**
```javascript
const socket = io();
```

### 2. Émettre un événement

**Client → Serveur :**
```javascript
socket.emit('chat-message', { message: 'Bonjour !' });
```

**Serveur → Client :**
```javascript
socket.emit('user-joined', { username: 'Alice' });
```

### 3. Écouter un événement

**Serveur :**
```javascript
socket.on('chat-message', (data) => {
    console.log('Message reçu:', data.message);
});
```

**Client :**
```javascript
socket.on('chat-message', (data) => {
    console.log('Nouveau message:', data.message);
});
```

### 4. Broadcasting

Envoyer à **TOUS** les clients connectés :

```javascript
io.emit('chat-message', data);  // Tout le monde reçoit
```

Envoyer à **UN SEUL** client :

```javascript
socket.emit('private-message', data);  // Seulement ce client
```

## 🎨 Fonctionnalités de l'interface

- **Écran de connexion** : Saisie du nom d'utilisateur
- **Zone de messages** : Affichage en temps réel avec scroll automatique
- **Messages système** : Notifications de connexion/déconnexion
- **Horodatage** : Heure d'envoi de chaque message
- **Compteur d'utilisateurs** : Nombre d'utilisateurs en ligne

## 🔍 Flux de données

```
1. Alice se connecte
   → Client: socket.emit('join', 'Alice')
   → Serveur: Ajoute Alice à la liste
   → Serveur: io.emit('user-joined', { username: 'Alice' })
   → Tous les clients: Affichent "Alice a rejoint le chat"

2. Alice envoie un message
   → Client: socket.emit('chat-message', { message: 'Salut !' })
   → Serveur: Reçoit le message
   → Serveur: io.emit('chat-message', { username: 'Alice', message: 'Salut !' })
   → Tous les clients: Affichent le message d'Alice

3. Alice se déconnecte
   → Serveur: Détecte la déconnexion (événement 'disconnect')
   → Serveur: Retire Alice de la liste
   → Serveur: io.emit('user-left', { username: 'Alice' })
   → Tous les clients: Affichent "Alice a quitté le chat"
```

## 🚀 Améliorations possibles

- [ ] Salons de discussion (rooms)
- [ ] Messages privés
- [ ] Indicateur "en train d'écrire..."
- [ ] Historique des messages
- [ ] Authentification des utilisateurs
- [ ] Émojis et formatage du texte
- [ ] Partage de fichiers

## 📚 Ressources

- [Documentation Socket.IO](https://socket.io/docs/)
- [Socket.IO Client API](https://socket.io/docs/v4/client-api/)
- [Socket.IO Server API](https://socket.io/docs/v4/server-api/)

## 🎯 Ce que vous avez appris

✅ Installer et configurer Socket.IO  
✅ Créer une connexion WebSocket  
✅ Émettre et écouter des événements  
✅ Broadcaster des messages à tous les clients  
✅ Gérer les connexions/déconnexions  
✅ Créer une interface de chat moderne  

**Prochaine étape :** Jour 17 - Socket.IO avancé (Rooms, namespaces, notifications)
