import  prisma  from "../lib/prisma.js";

export const findBrandByName = async (name: string) => {
    return prisma.brand.findUnique({
        where: { name },
    });
};

export const findBrandBySlug = async (slug: string) => {
    return prisma.brand.findUnique({
        where: { slug },
    });
};

export const createBrand = async (data: {
    name: string;
    slug: string;
    description?: string;
}) => {
    return prisma.brand.create({
        data,
    });
};