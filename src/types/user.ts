import { JwtPayload } from "jsonwebtoken";

export interface UserWithoutPassword {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    registerDate: string;
}

export interface UserWithPassword {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    registerDate: string;
}

export interface LoginInfo {
    email : string;
    password : string;
}

export interface CustomJwtPayload extends JwtPayload {
    id : string;
    email : string;
    version : number;
}

export type User = UserWithPassword | UserWithoutPassword;
export type AuthInfo = {
    accessToken: string,
    refreshToken: string
}
