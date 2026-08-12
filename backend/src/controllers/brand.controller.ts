import { success } from "zod";
import { createBrandService, deleteBrandService, getAllBrandsService, getBrandByIdService, updateBrandService } from "../services/brand.service.js";
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

export const getAllBrands = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const brands = await getAllBrandsService();

        res.status(200).json({
            success: true,
            message: "Brands fetched Successfully",
            data: brands,
        });
    } catch (error) {
        next(error);
    }
};

export const getBrandById = async (
    req: Request<{id: string}>, res: Response, next: NextFunction
) => {

    try {
        const brand = await getBrandByIdService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Brand Fetch Successfully",
            data: brand,
        })
    } catch (error) {
        next(error);
    }
};

export const updateBrandController = async (
    req: Request<{id: string}>, res: Response, next: NextFunction
) => {
    try {
        const brand = await updateBrandService(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Brand Updated Successfully",
            data: brand,
        })
    } catch (error) {
        next(error);
    }
};

export const deleteBrandController = async (
    req: Request<{id: string}>, res: Response, next: NextFunction
) => {
    try {
        await deleteBrandService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Brand deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};