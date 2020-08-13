import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@jagra_task_manager/common';

const router = express.Router();

router.post('/api/users/signup',[
    body('firstName')
        .trim()
        .isLength({ min: 1, max: 50})
        .withMessage('First name must be between 1-50 characters.'),
    body('lastName')
        .trim()
        .isLength({ min: 1, max: 50})
        .withMessage('Last name must be between 1-50 characters.'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid.'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Password must be between 4-20 characters.')
],
validateRequest,
async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (!!existingUser) {
        console.log('Email in use');
        throw new BadRequestError(`Email ${email} already in use`);
    }
    const user = User.build({ firstName, lastName, email, password});
    await user.save();
    // Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }, process.env.JWT_SECRET!);
    res.status(201).send({token: userJwt});
});

export { router as signupRouter }
