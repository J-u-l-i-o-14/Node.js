// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Autorise les requêtes Cross-Origin
app.use(morgan('dev')); // Logger HTTP
app.use(express.json()); // Parser JSON

// Routes
app.use('/api/tasks', taskRoutes);

// Route de base
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API ToDo List (Jour 10)' });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
    const error = new Error('Route non trouvée');
    res.status(404);
    next(error);
});

// Middleware de gestion d'erreurs global
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
