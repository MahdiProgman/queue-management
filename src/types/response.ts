import { StatusCodes } from "http-status-codes";

interface TokenInfo {
    refreshToken : string;
    accessToken : string;
}

export interface Error {
    error: string;
    field: string;
    location: string
}

interface DefaultResponse {
    code : StatusCodes;
    message : string;
}

interface SuccessResponse extends DefaultResponse {
    data: object;
    token? : TokenInfo;
}

interface ErrorResponse extends DefaultResponse {
    errors: Error[];
}

export type Response = DefaultResponse | SuccessResponse | ErrorResponse;