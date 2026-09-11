import { OrderStatus } from "../generated/prisma/enums";
import prisma from "../lib/prisma";
import { findCartByUserId, getCartWithItems } from "../repositories/cart.repository";
import { findOrderById, findOrdersByUserId, findOrderStatusById, findOrderStatusByIdAndUserId, updateOrderStatus } from "../repositories/order.repository";
import { AppError } from "../utils/AppError";

export const createOrderService = async (userId: string) => {
    const cart = await findCartByUserId(userId);

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const cartWithItems = await getCartWithItems(cart.id);

    if (!cartWithItems || cartWithItems.items.length === 0) {
        throw new AppError("Cart is empty", 400);
    }

    console.log("CART ITEMS", cartWithItems.items);

    let totalAmount = 0;

    for (const item of cartWithItems.items) {
        if (!item.product.isActive) {
            throw new AppError(`${item.product.name} is no longer available`, 400);
        }

        if (item.quantity > item.product.stock) {
            throw new AppError(`Only ${item.product.stock} items available for ${item.product.name}`,400,);
        }

        totalAmount += Number(item.product.price) * item.quantity;
    }

    console.log("TOTAL AMOUNT", totalAmount);

    const order = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
            data: {
                userId,
                totalAmount,
                status: "PENDING",
            },
        });

        for (const item of cartWithItems.items) {
            await tx.orderItem.create({
                data: {
                    orderId: createdOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                },
            });

            await tx.product.update({
                where: {
                    id: item.productId,
                    stock: {
                        gte: item.quantity,
                    },
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        await tx.cartItem.deleteMany({
            where: {
                cartId: cart.id,
            },
        });

        return createdOrder;
    });

    return order;
};

export const getOrdersService = async (userId: string) => {
    const orders = await findOrdersByUserId(userId);

    return orders;
};

export const getOrderByIdService = async (
    orderId: string, userId: string,
) => {
    const order = await findOrderById(orderId, userId);

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    return order;
};

export const updateOrderStatusService = async (
    orderId: string, status: OrderStatus,
) => {
    const order = await findOrderStatusById(orderId);
    
    if (!order) {
        throw new AppError("Order not found", 404);
    }

    const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
        PENDING: ["CONFIRMED"],
        CONFIRMED: [],
        CANCELLED: [],
    };

    const allowedstatuses = allowedTransitions[order.status];

    if (!allowedstatuses.includes(status)) {
        throw new AppError(`Order cannot be moved from ${order.status} to ${status}`, 400);
    }

    return updateOrderStatus(orderId, status);
};

export const cancelOrderService = async (
    orderId: string, userId: string,
) => {
    const order = await findOrderStatusByIdAndUserId(orderId, userId);

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    if (order.status === "CANCELLED") {
        throw new AppError("Order is already cancelled", 400);
    }

    if (order.status === "CONFIRMED") {
        throw new AppError("Only pending orders can be cancelled", 400);
    }

    return updateOrderStatus(orderId, "CANCELLED");
    
};