require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Route principale
app.get('/', (req, res) => {
    res.send(`<h1>${process.env.MESSAGE_ACCUEIL}</h1>`);
});

// Route de test pour voir les variables d'environnement (à ne pas faire en prod pour les secrets !)
app.get('/config', (req, res) => {
    res.json({
        port: PORT,
        message: process.env.MESSAGE_ACCUEIL,
        mode: process.env.NODE_ENV || 'development'
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur Express lancé sur http://localhost:${PORT}`);
    console.log(`Message d'accueil : ${process.env.MESSAGE_ACCUEIL}`);
});
