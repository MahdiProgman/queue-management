import moment from "moment-jalaali";
import UserModel from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RefreshTokenModel from "../models/refreshToken.js";
import * as refreshTokenService from "./refreshToken.service.js";
import { AuthInfo, LoginInfo, User, UserWithoutPassword, UserWithPassword } from "../types/user.js";

export const getUserById = async (id: string, withPassword: boolean): Promise<User | null> => {
    const userFound = await UserModel.findByPk(id);
    if (userFound) {
        const result = userFound.toJSON();
        result.registerDate = moment(result.registerDate).format('jYYYY/jMM/jDD HH:mm:ss');

        if (!withPassword) {
            const { password, ...otherFields } = result;

            return otherFields;
        }
        else {
            return result;
        }
    } else {
        return null;
    }
}

export const createAccessToken = async ({ id, email }: { id: string, email: string }, refreshToken: string, needToCreateRefreshToken: boolean): Promise<AuthInfo | null> => {
    const userExists = await UserModel.findOne(
        {
            where: { id },
            include: [
                {
                    model: RefreshTokenModel,
                    as: 'refreshToken'
                }
            ]
        }
    );
    if (userExists) {
        if (userExists.refreshToken) {
            const isRefreshTokenCorrect: boolean = await bcrypt.compare(refreshToken, userExists.refreshToken.refreshToken);
            if (isRefreshTokenCorrect) {
                const newAccessToken: string = jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
                if (needToCreateRefreshToken) {
                    const newRefreshToken: string = await refreshTokenService.createRefreshToken(id, email);
                    return {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    };
                } else {
                    return {
                        accessToken: newAccessToken,
                        refreshToken
                    }
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const createUser = async (user: UserWithPassword): Promise<UserWithoutPassword & AuthInfo | null> => {
    const userExistsWithEmail = await UserModel.findOne({ where: { email: user.email } });
    if (userExistsWithEmail) {
        return null;
    } else {
        const salt = await bcrypt.genSalt(5);
        const hashedPass = await bcrypt.hash(user.password, salt);

        user.password = hashedPass;

        const newUser = new UserModel(user);

        await newUser.save();

        const newRefreshToken: string = await refreshTokenService.createRefreshToken(newUser.id, user.email);
        const newAccessToken: AuthInfo | null = await createAccessToken({ id: newUser.id, email: user.email }, newRefreshToken, false) as AuthInfo;

        return {
            ...newUser.dataValues,
            accessToken: newAccessToken.accessToken,
            refreshToken: newRefreshToken
        };
    }
}

export const findUserByEmailAndPassword = async (data: LoginInfo): Promise<UserWithoutPassword | null> => {
    const userFound: UserModel | null = await UserModel.findOne({ where: { email: data.email } });
    if (userFound) {
        const isPassCorrect: boolean = await bcrypt.compare(data.password, userFound.password);
        if (isPassCorrect) {
            const { password, ...otherFields } = userFound.dataValues;
            return otherFields;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const loginUser = async (loginInfo: LoginInfo): Promise<AuthInfo | null> => {
    const userFound: UserWithoutPassword | null = await findUserByEmailAndPassword(loginInfo);
    if (userFound) {
        const refreshToken: string = await refreshTokenService.createRefreshToken(userFound.id as string, userFound.email);
        const accessToken: AuthInfo | null = await createAccessToken({ id: userFound.id as string, email: userFound.email }, refreshToken, false) as AuthInfo;

        return {
            accessToken: accessToken.accessToken,
            refreshToken
        };
    } else {
        return null;
    }
}
