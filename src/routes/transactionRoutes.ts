import { Router } from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createTransaction);
router.get('/', getTransactions);

export default router;