const express = require('express');
const router = express.Router();

// Données simulées (en mémoire)
const tasks = [
    { id: 1, title: 'Apprendre Node.js', completed: false },
    { id: 2, title: 'Maîtriser Express', completed: false },
    { id: 3, title: 'Découvrir MongoDB', completed: false }
];

// Route 1: Récupérer toutes les tâches
// GET /tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Route 2: Récupérer une tâche par son ID (Route paramétrée)
// GET /tasks/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id); // req.params contient les paramètres d'URL
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json(task);
});

// Route 3: Créer une nouvelle tâche (pour l'exemple)
// POST /tasks
router.post('/', (req, res) => {
    res.send('Création de tâche (TODO pour demain)');
});

module.exports = router;
