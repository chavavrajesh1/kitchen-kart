import prisma from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { Request, Response, NextFunction } from "express";

export const authorizeAdmin = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            },
            select: {
                role: true,
            },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.role !== "ADMIN") {
            throw new AppError("Admin access required", 403);            
        }

        next();
    } catch (error) {
        next(error);
    }
};