const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let tasks = [];
let taskId = 1;

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API IPSSI !');
});

app.get('/tasks', (req, res) => {
    res.send('Liste de toutes les tâches');
});

app.get('/tasks/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        // Non trouvé : Tâche non trouvée avec l'ID spécifié
        return res.status(404).json({ error: 'Tâche non trouvée.' });
    }

    // Succès : Renvoie les détails de la tâche demandée
    res.json(task);
});

app.put('/tasks/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const { title, description } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        // Non trouvé : Tâche non trouvée avec l'ID spécifié
        return res.status(404).json({ error: 'Tâche non trouvée.' });
    }

    if (title) {
        tasks[taskIndex].title = title;
    }

    if (description) {
        tasks[taskIndex].description = description;
    }

    // Succès : Tâche mise à jour
    res.json(tasks[taskIndex]);
});

app.delete('/tasks/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        // Non trouvé : Tâche non trouvée avec l'ID spécifié
        return res.status(404).json({ error: 'Tâche non trouvée.' });
    }

    tasks.splice(taskIndex, 1);

    // Succès : Tâche supprimée avec succès
    res.json({ message: 'Tâche supprimée avec succès.' });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

app.use(bodyParser.json());
