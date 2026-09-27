import { Router } from 'express';
import { Register, Login } from '../controllers/authController.js'

const router = Router();

router.post('/auth/register', Register);
router.post('/auth/login', Login);

export default router;