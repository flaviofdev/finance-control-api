import { Router } from 'express';
import { createTransaction, getTransactions, 
    getTransactionSummary, updateTransaction,
    deleteTransaction } from '../controllers/transactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/summary', getTransactionSummary);
router.get('/', getTransactions);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;