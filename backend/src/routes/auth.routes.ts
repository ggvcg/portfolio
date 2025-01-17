import { Router } from 'express';
import { register, login, changePassword, getUserInfo, getAllUsers, deleteAccount } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', auth, changePassword);
router.get('/me', auth, getUserInfo);
router.get('/users', getAllUsers);
router.post('/delete-account', auth, deleteAccount);

export default router; 