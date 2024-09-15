import express from 'express';
import authRouter from './routers/authRouter.js';
import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';

const router: express.Router = express.Router();

router.use('/auth', authRouter);

export default router;