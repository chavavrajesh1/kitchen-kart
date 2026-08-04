import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser } from '../services/auth.service.js';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await registerUser(req.body);        

        return res.status(201).json({
            success: true,
            message: "Registration Successfull",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await loginUser(req.body);

        return res.status(200).json({
            success: true,
            message: "Login Successfull",
            data: user,
        });
    } catch (error) {
        next(error);        
    }
};

export const getProfile = async (
    req: Request, res: Response
) => {
    return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: req.user,
    });
};

export const refresh = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const { refreshToken } = req.body;

        const accessToken = await refreshAccessToken(refreshToken);

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            data: accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const result = await logoutUser();

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }

}