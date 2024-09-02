const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.addTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.patch('/todos/:id', todoController.toggleTodo);

module.exports = router;
