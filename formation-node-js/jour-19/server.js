const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000; // Port dynamique pour le déploiement

// SÉCURITÉ
// 1. Helmet (En-têtes HTTP sécurisés)
app.use(helmet({
    contentSecurityPolicy: false // Désactivé pour permettre le chargement de scripts/images externes si besoin
}));

// 2. CORS (Cross-Origin Resource Sharing)
app.use(cors());

// 3. Rate Limiting (Limitation de débit)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite à 100 requêtes par IP par fenêtre
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
});
app.use(limiter);

// Configuration de Multer pour le stockage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Limite: 5MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myFile');

// Check File Type
function checkFileType(file, cb) {
    // extensions autorisées
    const filetypes = /jpeg|jpg|png|gif/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Erreur: Images seulement !');
    }
}

// Servir les fichiers statiques
app.use(express.static('public'));

// Endpoint d'upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ success: false, message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ success: false, message: 'Aucun fichier sélectionné' });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Fichier uploadé!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

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
    socket.on('chat-message', (data) => {
        const user = getCurrentUser(socket.id);
        if (user) {
            // data peut être un string (texte) ou un objet { message, type }
            const messageContent = typeof data === 'string' ? data : data.message;
            const messageType = data.type || 'text';

            io.to(user.room).emit('message', {
                username: user.username,
                text: messageContent,
                type: messageType, // 'text' ou 'image'
                timestamp: new Date().toLocaleTimeString()
            });
        }
    });

    // Message privé
    socket.on('private-message', ({ toId, message, type }) => {
        const user = getCurrentUser(socket.id);
        if (user) {
            const messageType = type || 'text';

            // Envoyer au destinataire
            io.to(toId).emit('private-message', {
                from: user.username,
                message: message,
                type: messageType,
                timestamp: new Date().toLocaleTimeString(),
                isPrivate: true
            });

            // Envoyer à l'expéditeur (pour affichage confirmation)
            socket.emit('private-message', {
                from: `(Privé à) ${getInternalUsername(toId)}`,
                message: message,
                type: messageType,
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
