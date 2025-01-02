import express from 'express';
import asyncHandler from 'express-async-handler';
import Task from './taskModel';

const router = express.Router();

// Get all tasks
router.get('/', asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
}));

// Create a task
router.post('/', asyncHandler(async (req, res) => {
  req.body.created_at = new Date();
  req.body.updated_at = new Date();
  const task = await Task(req.body).save();
  res.status(201).json(task);
}));

// Update a task
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  req.body.updated_at = new Date();
  const result = await Task.updateOne({ _id: req.params.id }, req.body);
  if (result.matchedCount) {
    res.status(200).json({ code: 200, msg: 'Task Updated Successfully' });
  } else {
    res.status(404).json({ code: 404, msg: 'Unable to find Task' });
  }
}));

// Delete a task
router.delete('/:id', asyncHandler(async (req, res) => {
  const result = await Task.deleteOne({ _id: req.params.id });
  if (result.deletedCount) {
    res.status(204).json();
  } else {
    res.status(404).json({ code: 404, msg: 'Unable to find Task' });
  }
}));

export default router;
