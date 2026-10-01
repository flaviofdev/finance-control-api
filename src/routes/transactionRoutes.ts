import { Router } from 'express';
import { createTransaction, getTransactions, getTransactionSummary } from '../controllers/transactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/summary', getTransactionSummary);

export default router;