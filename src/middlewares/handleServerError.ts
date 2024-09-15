import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export default (err : Error, req : Request, res : Response, next : NextFunction) : void => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code : StatusCodes.INTERNAL_SERVER_ERROR,
        message : 'Internal Server Error'
    });
}