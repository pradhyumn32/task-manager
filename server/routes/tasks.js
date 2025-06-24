const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/auth');
const router = express.Router();

const prisma = new PrismaClient();

// View all tasks grouped by status
router.get('/', authenticate, async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
    orderBy: { created_at: 'desc' },
  });

  const grouped = { 'To Do': [], 'In Progress': [], 'Done': [] };
  for (const task of tasks) {
    grouped[task.status]?.push(task);
  }

  res.json(grouped);
});

// Add new task
router.post('/', authenticate, async (req, res) => {
  const { title, status = 'To Do' } = req.body;
  const task = await prisma.task.create({
    data: { title, status, userId: req.user.id },
  });
  res.status(201).json(task);
});

// Update task (title or status)
router.put('/:id', authenticate, async (req, res) => {
  const { title, status } = req.body;

  const task = await prisma.task.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: {
      title: title ?? task.title,
      status: status ?? task.status,
    },
  });

  res.json(updated);
});

// Delete task
router.delete('/:id', authenticate, async (req, res) => {
  const id = parseInt(req.params.id);
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await prisma.task.delete({ where: { id } });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
