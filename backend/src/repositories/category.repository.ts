import prisma from "../lib/prisma.js";
import { CreateCategoryInput, UpdateCategoryInput } from "../schemas/category.schema.js";

export const findCategoryByName = async (name: string) => {
    return prisma.category.findUnique({
        where: {
            name,
        }, 
    });
};

export const findCategoryBySlug = async (slug: string) => {
    return prisma.category.findUnique({
        where: {
            slug
        },
    });
};

export const createCategory = async (data: CreateCategoryInput & { slug: string }) => {
    return prisma.category.create({
        data: {
            name: data.name,
            slug: data.slug,
            ...(data.description !== undefined && { description: data.description }),
            ...(data.image !== undefined && { image: data.image }),
        },
    });
};

export const getAllCategories = async () => {
    console.log("Repository Called");
    return prisma.category.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const findCategoryById = async (id: string) => {
    return prisma.category.findFirst({
        where: {
            id,
            isActive: true,
        },
    });
};

export const updateCategory = async (
    id: string,
    data: UpdateCategoryInput & { slug?: string }
) => {
    return prisma.category.update({
        where: {
            id,
        },
        data: {
            ...(data.name !== undefined && { name: data.name }),
            ...(data.slug !== undefined && { slug: data.slug }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.image !== undefined && { image: data.image }),
        },
    });
};

export const softDeleteCategory = async (id: string) => {
    return prisma.category.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
};