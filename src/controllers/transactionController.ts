import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const createTransaction = async (req: Request, res: Response) => {
    const { description, amount, type, category } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    if (!description || !amount || !type || !category) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ message: "Type must be 'income' or 'expense'." });
    }

    try {
        const transaction = await prisma.transaction.create({
            data: {
                description,
                amount: Number(amount),
                type,
                category,
                userId,
            },
        });

        return res.status(201).json(transaction);
    } catch(error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getTransactionSummary = async (req: Request, res: Response) => {
    const userId = req.userId;
    
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
        });

        // TODO: Refactor to prisma.aggregate for high volume scale
        const summary = transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === 'income') {
                    acc.incomes += transaction.amount;
                } else if (transaction.type === 'expense') {
                    acc.expenses += transaction.amount
                }

                return acc;
            },
            { incomes: 0, expenses: 0 }
        );

        const total = summary.incomes - summary.expenses;

        return res.status(200).json({
            incomes: summary.incomes,
            expenses: summary.expenses,
            total,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { id } = req.params as { id: string };
    const { description, amount, type, category } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized." });
    }

    try {
        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!existingTransaction) {
            return res.status(404).json({ message: "Transaction not found." });
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id },
            data: {
                description: description ?? existingTransaction.description,
                amount: amount ? Number(amount) : existingTransaction.amount,
                type: type ?? existingTransaction.type,
                category: category ?? existingTransaction.category,
            },
        });

        return res.status(200).json(updatedTransaction);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { id } = req.params as { id: string };

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized." });
    }

    try {
        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!existingTransaction) {
            return res.status(404).json({ message: "Transaction not found." });
        }

        await prisma.transaction.delete({
            where: { id },
        });

        return res.status(200).json({ message: "Transaction deleted succesfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};