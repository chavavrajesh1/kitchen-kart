import { Request, Response, NextFunction } from "express";
import { createNewCategory, getCategories as getCategoriesService, getCategoryById as getCategoryByIdService } from "../services/category.service.js";
import { AppError } from "../utils/AppError.js";

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
};

export const getCategoryById = async (
    req: Request<{id: string}>, res: Response, next: NextFunction 
) => {  
    try {

    const {id} = req.params;

    if (!id) {
        throw new AppError("Category id is required", 404);
    }

        const category = await getCategoryByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    } catch (error) {
        next(error);
    }
};