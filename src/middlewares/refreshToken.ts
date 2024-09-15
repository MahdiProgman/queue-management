import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from "../models/user";
import { StatusCodes } from "http-status-codes";
import RefreshTokenModel from "../models/refreshToken";
import { CustomJwtPayload } from "../types/user";

export default async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken : string | undefined = req.cookies?.refreshToken;
    if (refreshToken) {
        let decodedToken: CustomJwtPayload | null = null;
        try {
            decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as CustomJwtPayload;
        } catch {
            res.status(401).json({
                code : StatusCodes.UNAUTHORIZED,
                message: 'Your Refresh Token Is Not Valid'
            });
        }
        if (decodedToken) {
            const userFound: UserModel | null = await UserModel.findOne({
                where: {
                    id: decodedToken.id,
                    email: decodedToken.email
                },
                include : [
                    {
                        model : RefreshTokenModel,
                        as : 'refreshToken'
                    }
                ]
            });
            if (userFound && userFound.refreshToken) {
                const isRefreshTokenCorrect : boolean = await bcrypt.compare(refreshToken, userFound.refreshToken.refreshToken);
                if(isRefreshTokenCorrect){
                    if(decodedToken.version === userFound.refreshToken.version){
                        next();
                    } else {
                        res.status(StatusCodes.UNAUTHORIZED).json({
                            code : StatusCodes.UNAUTHORIZED,
                            message : 'Your Refresh Token Is Old'
                        });
                    }
                } else {
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        code : StatusCodes.UNAUTHORIZED,
                        message: 'Your Refresh Token Is Not Valid'
                    });
                }
            } else {
                res.status(401).json({
                    code : StatusCodes.UNAUTHORIZED,
                    message: 'Your Refresh Token Is Not Valid'
                });
            }
        }
    } else {
        res.status(401).json({
            code : StatusCodes.UNAUTHORIZED,
            message: 'You Not Have Refersh Token In Your Cookies Or You Not Sended Your Cookies'
        });
    }
}