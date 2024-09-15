import express from 'express';
import apiRouter from './../modules/router.js';
import cors from 'cors';
import 'express-async-errors';
import notFound from '../middlewares/notFound.js';
import handleServerError from '../middlewares/handleServerError.js';
import cookieParser from 'cookie-parser';

const api = express();

api.use(cors({
    credentials : true
}));
api.use(cookieParser());
api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use(process.env.API_ROUTE as string, apiRouter);

api.use(notFound);

api.use(handleServerError);

export default api;