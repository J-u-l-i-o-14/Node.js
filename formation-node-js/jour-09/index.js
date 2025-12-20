const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON (INDISPENSABLE pour POST/PUT)
app.use(express.json());

// Montage du routeur
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send('<h1>API ToDo List</h1><p>Utilisez Postman pour tester /tasks</p>');
});

app.listen(PORT, () => {
    console.log(`Serveur API lancé sur http://localhost:${PORT}`);
});
