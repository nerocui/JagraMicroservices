import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@jagra_task_manager/common';
import { PasswordManager } from '../services/password-manager';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Must supply a password'),
],
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (!existingUser || !await PasswordManager.compare(existingUser.password, password)) {
        throw new BadRequestError('Sign in information invalid');
    }
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName
    }, process.env.JWT_SECRET!);
    res.status(200).send({token: userJwt});
});

export { router as signinRouter }
