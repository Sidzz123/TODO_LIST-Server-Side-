const express = require('express');
const router = express.Router();
const Task = require('../Schema/todo'); // Todo DB
const USER = require('../Schema/user'); // User DB

// GET /tasks – Fetch all tasks
router.get('/', async (req, res) => {
  try {
    console.log(req.userId);
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tasks – Add a new task
router.post('/', async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const task = new Task({
      Title,
      Description: Description || "",
      user: req.userId
    });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { Title, Description, Completed } = req.body;
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { Title, Description, Completed },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /tasks/:id/complete – Mark as complete/incomplete
router.patch('/:id/complete', async (req, res) => {
  try {
    const { Completed } = req.body;
    if (typeof Completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be true or false" });
    }
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { Completed },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tasks/:id – Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
