const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est obligatoire'],
        trim: true,
        maxlength: [50, 'Le titre ne peut pas dépasser 50 caractères']
    },
    description: {
        type: String,
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

module.exports = mongoose.model('Task', taskSchema);
