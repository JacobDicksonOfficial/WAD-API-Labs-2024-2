import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasksData);
});

// Get task by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

// Add a new task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;

    // Create a new task object with required properties
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    // Add the task to the tasksData array
    tasksData.tasks.push(newTask);

    // Update the total_results count
    tasksData.total_results++;

    // Respond with the newly created task
    res.status(201).json(newTask);
});


export default router;
