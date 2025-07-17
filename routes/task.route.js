import express from 'express'
import { createTask, deleteTask, getAllTask, updateTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.post('/create-task', authMiddleware, createTask);
router.get('/get-all', authMiddleware, getAllTask);
router.put('/update-task/:id', authMiddleware, updateTask);
router.delete('/delete-task/:id', authMiddleware, deleteTask);
export default router;