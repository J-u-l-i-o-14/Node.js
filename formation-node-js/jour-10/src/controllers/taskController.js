// src/controllers/taskController.js
const Task = require('../models/Task');

exports.getAllTasks = (req, res) => {
    const tasks = Task.findAll();
    res.json(tasks);
};

exports.getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const task = Task.findById(id);

    if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.json(task);
};

exports.createTask = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Le titre est obligatoire' });
    }

    const newTask = Task.create(title);
    res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTask = Task.update(id, req.body);

    if (!updatedTask) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json(updatedTask);
};

exports.deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const success = Task.delete(id);

    if (!success) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json({ message: 'Tâche supprimée avec succès' });
};
