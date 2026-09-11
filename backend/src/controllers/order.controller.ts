import { Request, Response, NextFunction } from "express";
import { cancelOrderService, createOrderService, getOrderByIdService, getOrdersService, updateOrderStatusService } from "../services/order.service";

export const createOrder = async (
    req: Request<{userId: string}>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.user.userId;

        const order = await createOrderService(userId);

        return res.status(201).json({
            success: true,
            message: "Order created Successfully",
            data: order,
        })
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (
    req: Request<{userId: string}>, res: Response, next: NextFunction,
) => {
    try {
        const userId = req.user.userId;

        const orders = await getOrdersService(userId);

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (
    req: Request<{orderId: string}>, res: Response, next: NextFunction
) => {
    try {
        const userId = req.user.userId;

        const { orderId } = req.params;

        const order = await getOrderByIdService(orderId, userId);

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatusController = async (
    req: Request <{ orderId: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await updateOrderStatusService(
            orderId, status
        );

        return res.status(200).json({
            success: true,
            message: "Order Status Updated Successfully",
            data: order, 
        });
    } catch (error) {
        next(error);
    }
};

export const cancelOrderController = async (
    req: Request<{ orderId: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.user.userId;
        const { orderId } = req.params;
        
        const order = await cancelOrderService(orderId, userId);

        return res.status(200).json({
            success: true,
            message: "Order Cancelled Successfully",
            data: order,
        })
    } catch (error) {
        next(error);
    }
};