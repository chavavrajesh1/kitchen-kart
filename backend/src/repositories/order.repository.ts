import { OrderStatus } from "../generated/prisma/enums";
import prisma from "../lib/prisma";

export const createOrder = async (
    userId: string,
    totalAmount: number,
) => {
    return prisma.order.create({
        data: {
            userId,
            totalAmount,
        },
    });
};

export const createOrderItem = async (
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
) => {
    return prisma.orderItem.create({
        data: {
            orderId,
            productId,
            quantity,
            price,
        },
    }); 
};

export const findOrderById = async (orderId: string, userId: string) => {
    return prisma.order.findUnique({
        where: {
            id: orderId, userId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
};

export const findOrdersByUserId = async (userId: string) => {
    return prisma.order.findMany({
        where: {
            userId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
) => {
    return prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status,
        },
    });
};

export const findOrderStatusById = async (orderId: string) => {
    return prisma.order.findUnique({
        where: {
            id: orderId,
        },
        select: {
            id: true,
            status: true,
        },
    });
};

export const findOrderStatusByIdAndUserId = async (
    orderId: string, userId: string
) => {
    return prisma.order.findFirst({
        where: {id: orderId, userId}, select: {id: true, status: true},
    });
};