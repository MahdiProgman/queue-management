import { Request, Response } from "express";
import Controller from "./../controller.js";
import * as userService from "../../services/user.service.js";
import { StatusCodes } from "http-status-codes";
import { AuthInfo, LoginInfo, UserWithoutPassword, UserWithPassword } from "../../types/user.js";
import { findUserByRefreshToken } from "../../services/refreshToken.service.js";

export default new (class extends Controller {
    async register(req: Request, res: Response) {
        const userData: UserWithPassword = req.body;
        const newUser: UserWithoutPassword & AuthInfo | null = await userService.createUser(userData);

        if (newUser) {
            res.cookie('refreshToken', newUser.refreshToken, {
                httpOnly: true,
                secure: true,
                path: `${process.env.API_ROUTE as string}/auth/refresh-token`,
                sameSite: 'strict',
                maxAge: parseInt(process.env.REFRESH_TOKEN_LIFE as string) * 24 * 60 * 60
            });

            const { refreshToken, accessToken, ...otherFields } = newUser;

            this.response(
                {
                    code: StatusCodes.CREATED,
                    message: 'success',
                    data: otherFields,
                    token: {
                        accessToken,
                        refreshToken
                    }
                },
                res
            );
        }
    }

    async login(req: Request, res: Response) {
        const loginInfo: LoginInfo = req.body;
        const loginIntoUser: AuthInfo | null = await userService.loginUser(loginInfo);
        if (loginIntoUser) {
            const userFound: UserWithoutPassword = await userService.findUserByEmailAndPassword(loginInfo) as UserWithoutPassword;

            res.cookie('refreshToken', loginIntoUser.refreshToken, {
                httpOnly: true,
                secure: true,
                path: `${process.env.API_ROUTE as string}/auth/refresh-token`,
                sameSite: 'strict',
                maxAge: parseInt(process.env.REFRESH_TOKEN_LIFE as string) * 24 * 60 * 60
            });

            this.response(
                {
                    code: StatusCodes.OK,
                    message: 'success',
                    data: userFound,
                    token: loginIntoUser
                },
                res
            );
        } else {
            this.response(
                {
                    code: StatusCodes.UNAUTHORIZED,
                    message: 'user not found with the email and password',
                    errors: [
                        {
                            field: 'email',
                            error: 'email or password is incorrect',
                            location: 'body'
                        },
                        {
                            field: 'password',
                            error: 'email or password is incorrect',
                            location: 'body'
                        }
                    ]
                },
                res
            );
        }
    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken: string = req.cookies.refreshToken;

        const userFound: UserWithoutPassword | null = await findUserByRefreshToken(req.cookies.refreshToken as string);
        if (userFound) {
            const authInfo: AuthInfo | null = await userService.createAccessToken({ id: userFound.id as string, email: userFound.email }, refreshToken, true);
            if (authInfo) {
                this.response(
                    {
                        code: StatusCodes.OK,
                        message: 'success',
                        data: authInfo
                    },
                    res
                );
            } else {
                this.response(
                    {
                        code: StatusCodes.UNAUTHORIZED,
                        message: 'Something went wrong please try again later',
                    },
                    res
                );
            }
        }
    }
})();