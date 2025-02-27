


const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

router.post('/', checkAuth, taskController.createTask);

router.get('/all', checkAuth, taskController.getAllTasks);

router.get('/myTasks', checkAuth, taskController.getCurrentUserTasks);

router.get('/:taskId', checkAuth, taskController.getSingleTask);

router.put('/:taskId', checkAuth, taskController.updateTask);

router.delete('/:taskId', checkAuth, taskController.deleteTask);

router.delete('/all/deleteAll', checkAuth, taskController.deleteAllTasks);

module.exports = router;
