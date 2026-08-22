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

export const findAllBrands = async () => {
    return prisma.brand.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const findBrandById = async (id: string) => {
    return prisma.brand.findUnique({
        where: { id },
    });
};

export const updateBrand = async (
    id: string,
    data: {
        name?: string;
        slug?: string;
        description?: string;
        isActive?: boolean;
    }) => {
        return prisma.brand.update({
            where: { id },
            data,
        });
};

export const deleteBrand = async (id : string) => {
    return prisma.brand.delete({
        where: {id},
    });
};

