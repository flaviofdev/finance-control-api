import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const Register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: "Please fill in all fields."});
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (userExists) {
        return res.status(400).json({message: "User already exists."});
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
        data: {
            name, 
            email,
            passwordHash,
        },
    });

    return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    });
};

export const Login = async (req: Request, res: Response ) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json ({message: "Please fill in all fields!"});
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(401).json ({message: "Invalid credentials."});
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
        return res.status(401).json ({message: "Invalid credentials."});
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(
        { id: user.id },
        secret,
        { expiresIn: '1d' }
    )

    return res.status(200).json({
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        },
        token,
    });

};