import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parseResult = schema.safeParse(req.body);

        if (!parseResult.success) {
            console.log('Zod Issues:', parseResult.error.issues);
            const firstErrorMessage = parseResult.error.issues[0]?.message || 'Invalid data.';

            return res.status(400).json({
                error: firstErrorMessage,
            });
        }

        req.body = parseResult.data;
        return next();
    };
};