import RefreshTokenModel from "../models/refreshToken.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from "../models/user.js";
import { CustomJwtPayload, UserWithoutPassword } from "../types/user.js";
import { getUserById } from "./user.service.js";

const daysOfSurvive: number = parseInt(process.env.REFRESH_TOKEN_LIFE as string);


const generateRefreshToken = (id: string, email: string, daysOfSurvive: number, version: number): string => {
    const newRefershToken: string = jwt.sign({ id, email, version }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: `${daysOfSurvive}d` });
    return newRefershToken;
}
export const createRefreshToken = async (userID: string, email: string): Promise<string> => {
    let refreshToken : string;
    const oldRefreshTokenFound: RefreshTokenModel | null = await RefreshTokenModel.findOne({ where: { userID } });
    if(oldRefreshTokenFound){
        refreshToken = generateRefreshToken(userID, email, daysOfSurvive, oldRefreshTokenFound.version + 1);
    } else {
        refreshToken = generateRefreshToken(userID, email, daysOfSurvive, 1);
    }


    const salt: string = await bcrypt.genSalt(10);
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, salt);
    const now: Date = new Date();
    const expireDate: Date = new Date(now.getTime() + daysOfSurvive * 24 * 60 * 60 * 1000);
    
    if(oldRefreshTokenFound){
        await oldRefreshTokenFound.update({
            refreshToken : hashedRefreshToken,
            expiresAt : expireDate,
            version : oldRefreshTokenFound.version + 1
        });
    } else {
        const newRefreshToken = new RefreshTokenModel({
            userID,
            refreshToken: hashedRefreshToken,
            expiresAt: expireDate
        });
    
        await newRefreshToken.save();
    }

    return refreshToken;
}

export const findUserByRefreshToken = async (refreshToken: string): Promise<UserWithoutPassword | null> => {
    let decodeddToken: CustomJwtPayload | null = null;
    try {
        decodeddToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as CustomJwtPayload;
    } catch {
        return null;
    }
    if (decodeddToken) {
        const userFound: UserWithoutPassword | null = await getUserById(decodeddToken.id, false);
        if (userFound) {
            return userFound;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const checkTheRefreshTokenForThisUser = async (refreshToken: string, userId: number): Promise<boolean> => {
    const userFound: UserModel | null = await UserModel.findOne({
        include: {
            model: RefreshTokenModel,
            as: 'refreshToken'
        }
    });

    if (userFound?.refreshToken && userFound.refreshToken.refreshToken == refreshToken) {
        return true;
    } else {
        return false;
    }
}