import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1]!;

    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
};