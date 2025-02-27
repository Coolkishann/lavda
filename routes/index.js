import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Import authMiddleware

import authRoutes from './auth.js';
import usersRoutes from './users.js';
import tasksRoutes from './tasks.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', authMiddleware, usersRoutes); // Use authMiddleware for '/users' routes
router.use('/tasks', authMiddleware, tasksRoutes); // Use authMiddleware for '/tasks' routes

export default router;
