import { Router } from 'express';
import { Register, Login } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../schemas/authSchemas.js';

const router = Router();

router.post('/register', validate(registerSchema), Register);
router.post('/login', validate(loginSchema), Login);

export default router;