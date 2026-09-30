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