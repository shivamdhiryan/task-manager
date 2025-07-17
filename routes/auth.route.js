import express from 'express'
import { loginRoute, logoutRoute, registerRoute } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.post('/register', registerRoute);
router.post('/login', loginRoute);
router.get('/logout', authMiddleware, logoutRoute);
export default router;