import autoBind from "auto-bind";
import express from 'express';
import { Result, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Response, Error } from "../types/response.js";



export default class {
    constructor() {
        autoBind(this);
    }

    public response(response: Response, res: express.Response): void {
        res.status(response.code).json(response);
    }

    private _validationBody(req: express.Request, res: express.Response): boolean {
        const result: Result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            const messages: Error[] = [];
            errors.forEach((err) => messages.push({ field: err.path, error: err.msg, location: err.location }));
            this.response(
                {
                    code: 400,
                    message: 'bad request',
                    errors: messages
                },
                res
            );
            return false;
        } else {
            return true;
        }
    }

    public validate(req: express.Request, res: express.Response, next: express.NextFunction): void {
        if (this._validationBody(req, res))
            next();
    }
}