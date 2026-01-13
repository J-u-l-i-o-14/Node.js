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

    // Quand un utilisateur rejoint une salle
    socket.on('join', (data) => {
        const { username, room } = data;
        socket.join(room);

        users.push({ id: socket.id, username, room });

        // Notifier la salle et envoyer la LISTE à jour
        io.to(room).emit('room-users', {
            room: room,
            users: getUsersInRoom(room)
        });

        socket.broadcast.to(room).emit('message', {
            username: 'Système',
            text: `${username} a rejoint le chat`,
            timestamp: new Date().toLocaleTimeString()
        });

        console.log(`👤 ${username} a rejoint la salle ${room}`);
    });

    // Message chat global (salle)
    socket.on('chat-message', (msg) => {
        const user = getCurrentUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', {
                username: user.username,
                text: msg,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    });

    // Message privé
    socket.on('private-message', ({ toId, message }) => {
        const user = getCurrentUser(socket.id);
        if (user) {
            // Envoyer au destinataire
            io.to(toId).emit('private-message', {
                from: user.username,
                message: message,
                timestamp: new Date().toLocaleTimeString(),
                isPrivate: true
            });

            // Envoyer à l'expéditeur (pour affichage confirmation)
            socket.emit('private-message', {
                from: `(Privé à) ${getInternalUsername(toId)}`,
                message: message,
                timestamp: new Date().toLocaleTimeString(),
                isPrivate: true,
                self: true
            });
        }
    });

    // Typing
    socket.on('typing', () => {
        const user = getCurrentUser(socket.id);
        if (user) {
            socket.broadcast.to(user.room).emit('typing', { username: user.username });
        }
    });

    socket.on('stop-typing', () => {
        const user = getCurrentUser(socket.id);
        if (user) {
            socket.broadcast.to(user.room).emit('stop-typing', { username: user.username });
        }
    });

    // Déconnexion
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', {
                username: 'Système',
                text: `${user.username} a quitté le chat`,
                timestamp: new Date().toLocaleTimeString()
            });

            // Mettre à jour la liste des utilisateurs
            io.to(user.room).emit('room-users', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

// Fonctions utilitaires
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getUsersInRoom(room) {
    return users.filter(user => user.room === room);
}

function getInternalUsername(id) {
    const user = users.find(u => u.id === id);
    return user ? user.username : 'Inconnu';
}

server.listen(PORT, () => {
    console.log(`🚀 Serveur Socket.IO (Rooms) démarré sur http://localhost:${PORT}`);
});
