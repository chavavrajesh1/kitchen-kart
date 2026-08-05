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

export const updatePasswordResetToken = async (
    userId: string,
    resetPasswordToken: string,
    resetPasswordExpiry: Date
) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            resetPasswordToken,
            resetPasswordExpiry,
        },
    });
};

export const findUserByResetPasswordToken = async (
    resetPasswordToken: string
) => {
    return prisma.user.findFirst({
        where: {
            resetPasswordToken,
        },
    });
};

export const updateUserPassword = async (
    userId: string,
    hashedPassword: string
) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpiry: null,
        },
    });
};