import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        throw new BadRequestError('Not Authenticated');
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
    } catch (_) {
        throw new BadRequestError('Not Authorized');
    }
    next();
}
