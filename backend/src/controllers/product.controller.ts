import { Request, Response, NextFunction } from "express";
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../services/product.service.js";
import { getAllBrandsService } from "../services/brand.service.js";

export const createProduct = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {

        console.log("controller body:", req.body);
        const product = await createProductService(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {

        const search = typeof req.query.search === "string" ? req.query.search : undefined;
        
        const categoryId = typeof req.query.categoryId === "string" ? req.query.categoryId : undefined;

        const brandId = typeof req.query.brandId === "string" ? req.query.brandId : undefined;

        const minPrice = typeof req.query.minPrice === "string" ? Number(req.query.minPrice) : undefined;

        const maxPrice = typeof req.query.maxPrice === "string" ? Number(req.query.maxPrice) : undefined;

        const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : undefined;

        const sortOrder = typeof req.query.sortOrder === "string" ? req.query.sortOrder : undefined;

        console.log("sortBye:", sortBy);
        console.log("sortOrder:", sortOrder);

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await getAllProductsService(search, categoryId,brandId,minPrice,maxPrice,skip, limit, sortBy, sortOrder);


        res.status(200).json({
            success: true,
            message: "Products fetched Successfully",
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (
    req: Request<{id: string}>, res: Response, next: NextFunction
) => {
    try {
        const product = await getProductByIdService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        })
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (
    req: Request<{id: string}>, res: Response, next: NextFunction
) => {
    try {
        const product = await updateProductService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data:product,
        })
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (
    req: Request<{id: string}>, res: Response, next: NextFunction
) => {
    try {
        const product = await deleteProductService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};