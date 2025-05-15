const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all todos
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM todos');
  res.json(rows);
});

// Add a new todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  await db.query('INSERT INTO todos (title) VALUES (?)', [title]);
  res.status(201).json({ message: 'Todo added' });
});

// Delete todo by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await db.query('DELETE FROM todos WHERE id = ?', [id]);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
