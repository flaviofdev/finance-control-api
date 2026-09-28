import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json ({message: "Unauthorized."});
    }

    const [ scheme, token ] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({message: "Invalid token format."});
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'secret_key_default';

        const decoded = jwt.verify(token, secretKey) as unknown as TokenPayload;
        
        req.userId = decoded.id;
        return next();

    } catch (error) {
        return res.status(401).json({message: "Invalid or expired token."})
    }

}