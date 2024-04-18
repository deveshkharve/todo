const { Router } = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../services/todo-service.js');

const todoApiRouter = Router()

todoApiRouter.get('/', (req, res) => {
  getTasks(req.userId)
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error getting tasks:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

todoApiRouter.post('/', (req, res) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !status) {
    res.status(400).json({ message: 'Title and status are required' });
    return;
  }
  const userId = req.userId;
  createTask(userId, title, description, dueDate)
    .then(task => {
      res.json(task);
    })
    .catch(error => {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

todoApiRouter.put('/:id', (req, res) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !status) {
    res.status(400).json({ message: 'Title and status are required' });
    return;
  }
  const { id } = req.params;
  const userId = req.userId;
  updateTask(id, userId, title, description, dueDate, status)
    .then(task => {
      res.json(task);
    })
    .catch(error => {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

todoApiRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  deleteTask(id, userId)
    .then(() => {
      res.json({ message: 'Task deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


module.exports = {
  todoApiRouter
}
