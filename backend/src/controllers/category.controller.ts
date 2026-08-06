import { Request, Response, NextFunction } from "express";
import { createNewCategory, getCategories as getCategoriesService } from "../services/category.service.js";
import { success } from "zod";

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
};

export const getCategories = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const categories = await getCategoriesService();

        console.log("Controller Called");

        return res.status(200).json({
            success: true,
            message: "Categories fetched Successfully",
            data: categories,
        });
    } catch (error) {
        next(error);
    }
}