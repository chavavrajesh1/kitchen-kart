import jwt from "jsonwebtoken";

export interface JwtPayload {
    userId: string;
    email: string;
}

export const generateAccessToken = (payload: {
    userId: string;
    email: string;
}) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
}