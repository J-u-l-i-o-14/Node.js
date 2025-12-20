const express = require('express');
const router = express.Router();

// Stockage en mémoire (simule une base de données)
let tasks = [
    { id: 1, title: 'Apprendre Node.js', completed: true },
    { id: 2, title: 'Créer une API REST', completed: false }
];

// READ - Récupérer toutes les tâches
router.get('/', (req, res) => {
    res.json(tasks);
});

// READ - Récupérer une tâche par ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.json(task);
});

// CREATE - Ajouter une nouvelle tâche
router.post('/', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Le titre est obligatoire' });
    }

    const newTask = {
        id: tasks.length + 1, // ID auto-incrémenté simple
        title: title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask); // 201 = Created
});

// UPDATE - Modifier une tâche existante
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Mise à jour des champs (si fournis)
    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.completed !== undefined) task.completed = req.body.completed;

    res.json(task);
});

// DELETE - Supprimer une tâche
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Suppression de l'élément du tableau
    const deletedTask = tasks.splice(index, 1);
    res.json({ message: 'Tâche supprimée avec succès', task: deletedTask[0] });
});

module.exports = router;
