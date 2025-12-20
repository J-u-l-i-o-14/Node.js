const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

// 1. Middleware Global : s'applique à TOUTES les requêtes
app.use(logger);

// 2. Middleware intégré : express.json()
// Permet de lire le corps (body) des requêtes POST/PUT au format JSON
// Sans ça, req.body serait undefined
app.use(express.json());

// Route GET simple
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur du Jour 8 !');
});

// Route POST pour tester express.json()
app.post('/data', (req, res) => {
    console.log('Données reçues :', req.body);

    if (!req.body.name) {
        // On déclenche une erreur volontairement
        throw new Error('Le champ "name" est obligatoire !');
    }

    res.json({
        message: `Bonjour ${req.body.name}, données bien reçues !`,
        receivedData: req.body
    });
});

// Route pour simuler une erreur
app.get('/error', (req, res) => {
    throw new Error('Ceci est une erreur simulée');
});

// 3. Middleware de gestion d'erreurs
// Doit TOUJOURS être défini à la fin, après toutes les routes
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
