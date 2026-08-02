import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service.js';

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