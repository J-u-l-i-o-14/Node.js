const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Servir les fichiers statiques
app.use(express.static('public'));

// Tableau pour stocker les utilisateurs connectés
const users = [];

// Événements Socket.IO
io.on('connection', (socket) => {
    console.log('✅ Nouvel utilisateur connecté:', socket.id);

    // Quand un utilisateur rejoint le chat
    socket.on('join', (username) => {
        // Ajouter l'utilisateur à la liste
        users.push({ id: socket.id, username });

        // Notifier tout le monde qu'un nouvel utilisateur a rejoint
        io.emit('user-joined', {
            username,
            message: `${username} a rejoint le chat`,
            users: users.length
        });

        console.log(`👤 ${username} a rejoint le chat`);
    });

    // Quand un message est envoyé
    socket.on('chat-message', (data) => {
        // Trouver l'utilisateur qui a envoyé le message
        const user = users.find(u => u.id === socket.id);

        if (user) {
            // Diffuser le message à TOUS les clients
            io.emit('chat-message', {
                username: user.username,
                message: data.message,
                timestamp: new Date().toLocaleTimeString()
            });

            console.log(`💬 ${user.username}: ${data.message}`);
        }
    });

    // Quand un utilisateur se déconnecte
    socket.on('disconnect', () => {
        // Trouver et retirer l'utilisateur de la liste
        const userIndex = users.findIndex(u => u.id === socket.id);

        if (userIndex !== -1) {
            const username = users[userIndex].username;
            users.splice(userIndex, 1);

            // Notifier tout le monde
            io.emit('user-left', {
                username,
                message: `${username} a quitté le chat`,
                users: users.length
            });

            console.log(`❌ ${username} a quitté le chat`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Serveur Socket.IO démarré sur http://localhost:${PORT}`);
});
