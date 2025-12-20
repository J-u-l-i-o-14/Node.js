// src/models/Task.js

// Simulation d'une base de données en mémoire
let tasks = [
    { id: 1, title: 'Faire les courses', completed: false },
    { id: 2, title: 'Apprendre Node.js', completed: true }
];

class Task {
    constructor(id, title, completed = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    static findAll() {
        return tasks;
    }

    static findById(id) {
        return tasks.find(t => t.id === id);
    }

    static create(title) {
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        const newTask = new Task(newId, title);
        tasks.push(newTask);
        return newTask;
    }

    static update(id, data) {
        const task = this.findById(id);
        if (!task) return null;

        if (data.title !== undefined) task.title = data.title;
        if (data.completed !== undefined) task.completed = data.completed;

        return task;
    }

    static delete(id) {
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) return false;

        tasks.splice(index, 1);
        return true;
    }
}

module.exports = Task;
