import { createBrandService } from "../services/brand.service.js";
import { Request, Response, NextFunction } from "express";

export const createBrand = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const brand = await createBrandService(req.body);

        res.status(201).json({
            success: true,
            message: "Brand Crated Successfully",
            data: brand
        })
    } catch (error) {
        next(error);
    }
};