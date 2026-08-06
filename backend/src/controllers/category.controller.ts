import { Request, Response, NextFunction } from "express";
import { createNewCategory } from "../services/category.service.js";

export const createCategory = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const category = await createNewCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "Category created Successfully",
            data: category,
        });
    } catch (error) {
        next(error);
    }
}