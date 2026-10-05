import { Router } from 'express';
import { createTransaction, getTransactions, 
    getTransactionSummary, updateTransaction,
    deleteTransaction } from '../controllers/transactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createTransactionSchema, updateTransactionSchema } from '../schemas/transactionSchema.js';

const transactionRoutes = Router();

transactionRoutes.use(authMiddleware);

transactionRoutes.get('/summary', getTransactionSummary);
transactionRoutes.post('/', validate(createTransactionSchema), createTransaction);
transactionRoutes.put('/:id', validate(updateTransactionSchema), updateTransaction);
transactionRoutes.get('/', getTransactions);
transactionRoutes.delete('/:id', deleteTransaction);

export default transactionRoutes;