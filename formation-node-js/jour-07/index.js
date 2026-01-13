const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 3000;

// Pour lire le JSON 
// ou
// Middleware pour parser le JSON (on verra ça en détail demain, mais c'est utile)
app.use(express.json());

// Utilisation du routeur
// Toutes les routes définies dans tasksRouter seront préfixées par /tasks
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur l\'API de gestion de tâches</h1><p>Essayez <a href="/tasks">/tasks</a> ou <a href="/tasks/1">/tasks/1</a></p>');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
