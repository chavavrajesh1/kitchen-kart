import prisma from "../lib/prisma.js";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const createUser = async (data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}) => {
    return prisma.user.create({
        data: {
            firstName: data.firstName,
            ...(data.lastName !== undefined && {
                lastName: data.lastName,
            }),
            email: data.email,
            password: data.password,
        },
    });
};