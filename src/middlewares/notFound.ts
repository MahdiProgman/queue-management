import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default (req: Request, res: Response): void => {
    res.status(StatusCodes.NOT_FOUND).json({
        code: StatusCodes.NOT_FOUND,
        message: 'Not Found'
    });
}