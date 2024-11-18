import express from 'express';
import { register, login, logout } from '../controllers/authController';

const router = express.Router();

router.post('/register', register); // User registration
router.post('/login', login);       // User login
router.post('/logout', logout);    // User logout

export default router;
