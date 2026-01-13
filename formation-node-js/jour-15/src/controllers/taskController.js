const Task = require('../models/Task');

// @desc    Récupérer toutes les tâches de l'utilisateur connecté
// @route   GET /api/tasks
exports.getAllTasks = async (req, res) => {
    try {
        // Ne récupère QUE les tâches de l'utilisateur connecté
        const tasks = await Task.find({ user: req.userId });
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

        // Vérifier que la tâche appartient à l'utilisateur
        if (task.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Accès refusé' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Créer une tâche
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
    try {
        // Attacher automatiquement l'utilisateur connecté
        const newTask = await Task.create({
            ...req.body,
            user: req.userId
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Mettre à jour une tâche
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        // Vérifier la propriété
        if (task.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Accès refusé' });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Supprimer une tâche
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        // Vérifier la propriété
        if (task.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Accès refusé' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
