import prisma from "../lib/prisma.js";
import { CreateCategoryInput } from "../schemas/category.schema.js";

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