import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from "../models/user";
import { CustomJwtPayload } from "../types/user";
import { StatusCodes } from "http-status-codes";

export default async (req: Request, res: Response, next: NextFunction) => {
    const authToken: string | undefined = req.headers['authorization'];
    if (authToken) {
        if (authToken.split(' ')[0] === 'Bearer') {
            const token: string = authToken.split(' ')[1];
            let decodedToken : CustomJwtPayload | null = null;
            try {
                decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as CustomJwtPayload;
            } catch {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    code : StatusCodes.UNAUTHORIZED,
                    message : 'Your Authorization Token Is Not Valid'
                });
            }
            if(decodedToken){
                const userFound: UserModel | null = await UserModel.findOne({
                    where : {
                        id : decodedToken.id,
                        email : decodedToken.email
                    }
                });
                if(userFound){
                    next();
                } else {
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        code : StatusCodes.UNAUTHORIZED,
                        message : 'Your Authorization Token Is Not Valid'
                    });
                }
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                code: StatusCodes.UNAUTHORIZED,
                message: 'Your Authorization Token Is Not A Bearer Token'
            });
        }
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
            code: StatusCodes.UNAUTHORIZED,
            message: 'Authorization Token Is Not On Header'
        });
    }
}