import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Global Error:', error);

    if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
        return res.status(400).json({ error: 'Invalid JSON payload format.' });
    }

    return res.status(500).json({ error: 'Internal server error.' });
};