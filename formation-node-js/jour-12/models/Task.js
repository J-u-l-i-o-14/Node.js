const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est obligatoire'], // Validation personnalisée
        trim: true, // Supprime les espaces au début et à la fin
        maxlength: [50, 'Le titre ne peut pas dépasser 50 caractères']
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire'], // Validation personnalisée
        maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Création du modèle à partir du schéma
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
