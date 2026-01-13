require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
connectDB();

app.get('/', (req, res) => {
    res.send('API fonctionnelle et connectée à MongoDB !');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
