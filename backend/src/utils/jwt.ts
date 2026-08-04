import jwt from "jsonwebtoken";

export interface JwtPayload {
    userId: string;
    email: string;
}

export const generateAccessToken = (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "7d",
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
}