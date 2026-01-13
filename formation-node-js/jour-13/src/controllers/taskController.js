const Task = require('../models/Task');

// @desc    Récupérer toutes les tâches
// @route   GET /api/tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Récupérer une tâche par ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Créer une nouvelle tâche
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Mettre à jour une tâche
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Renvoie l'objet modifié
            runValidators: true // Relance les validations du schéma
        });

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Supprimer une tâche
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        res.json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
