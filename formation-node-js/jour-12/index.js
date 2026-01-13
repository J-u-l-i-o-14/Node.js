require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const Task = require('./models/Task');
const User = require('./models/User');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = process.env.PORT || 3000;

// Chargement Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// Connexion DB
connectDB();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route de test pour créer une tâche via Mongoose
app.post('/test-task', async (req, res) => {
    try {
        // Création d'une instance du modèle
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        // Mongoose renvoie des erreurs de validation ici si les données sont invalides
        res.status(400).json({ success: false, error: error.message });
    }
});

// Route de test pour créer un utilisateur
app.post('/test-user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
