import prisma from '../lib/prisma.js';

export const createAddress = async (
    userId: string,
    data: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isDefault: boolean;        
    },
) => {
    return prisma.address.create({
        data: {
            userId,
            ...data,
        },
    });
};

export const findAddressesByUserId = async (
    userId: string
) => {
    return prisma.address.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const findAddressByIdandUserId = async (
    addressId: string, userId: string
) => {
    return prisma.address.findFirst({
        where: {
            id: addressId,
            userId,
        },
    });
};

export const updateAddress = async (
    addressId: string, 
    userId: string, 
    data: {
        fullName?: string;
        phone?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        isDefault?: boolean;
    },
) => {
    return prisma.address.update({
        where: {
            id: addressId,
            userId,
        },
        data,
    });
};

export const deleteAddress = async (addressId: string, userId: string) => {
    return prisma.address.deleteMany({
        where: {
            id: addressId,
            userId,
        },
    });
};
