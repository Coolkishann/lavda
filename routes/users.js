
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/me/:id', userController.getUserInfo);
router.put('/me', userController.updateUser);


module.exports = router;