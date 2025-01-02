import express from 'express';
import Task from './taskModel';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a task
router.post('/', async (req, res) => {
    try {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        req.body.updated_at = new Date();
        const result = await Task.updateOne({ _id: req.params.id }, req.body);
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'Task Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to find Task' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id });
        if (result.deletedCount) {
            res.status(204).json();
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to find Task' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
