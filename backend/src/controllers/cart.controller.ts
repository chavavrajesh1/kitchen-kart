import { Request, Response, NextFunction } from "express";
import { addToCartService, clearCartService, getCartService, removeFromCartService, updateCartItemQuantityService } from "../services/cart.service";
import { AppError } from "../utils/AppError";

export const getCart = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const userId = req.user.userId;

        const cart = await getCartService(userId);

        res.status(200).json({
            success: true,
            message: "Cart fetched Successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const userId = req.user.userId;

        const { productId, quantity } = req.body;

        console.log("ADD TO CART CONTROLLER");
        console.log("PRODUCT ID:", productId);
        console.log("QUANTITY:", quantity);

        const cartItem = await addToCartService(
            userId, productId, quantity,
        );

        res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            data: cartItem,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCartItemQuantity = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const userId = req.user.userId;

        const { productId } = req.params;
        const { quantity } = req.body;

        if (!productId || Array.isArray(productId)) {
            throw new AppError("Invalid product ID", 400);
        }

        const cartItem = await updateCartItemQuantityService(
            userId, productId, quantity,
        );

        res.status(200).json({
            success: true,
            message: "Cart item quantity updated successfully",
            data: cartItem
        })
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const userId = req.user.userId;

        const { productId } = req.params;

        if (!productId || Array.isArray(productId)) {
            throw new AppError("Invalid product ID", 400);
        }

        const cartItem = await removeFromCartService(
            userId, productId,
        );

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            data: cartItem,
        })
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const userId = req.user.userId;

        await clearCartService(userId);

        res.status(200).json({
            success: true,
            message: "Cart cleared Successfully",        
        })
    } catch (error) {
        next(error);
    }
};