import { createBrand, deleteBrand, findAllBrands, findBrandById, findBrandByName, findBrandBySlug, updateBrand } from "../repositories/brand.repository";
import { AppError } from "../utils/AppError";


interface CreateBrandInput {
    name: string;
    slug: string;
    description?: string;
}

export const createBrandService = async (data: CreateBrandInput) => {
    const existingName = await findBrandByName(data.name);
    
    if (existingName) {
        throw new AppError ("Brand name already exists", 409);
    }

    const existingSlug = await findBrandBySlug(data.slug);
    
    if (existingSlug) {
        throw new AppError ("Brand slug already exists", 409);
    }

    return createBrand(data);
};

export const getAllBrandsService = async () => {
    return findAllBrands();
}

export const getBrandByIdService = async (id: string) => {
    const brand = await findBrandById(id);

    if (!brand){
        throw new AppError("Brand not found", 404);
    }

    return brand;
};

export const updateBrandService = async (
    id: string,
    data: {
        name?: string;
        slug?: string;
        description?: string;
        isActive?: boolean;
    }
) => {
    const existingBrand = await findBrandById(id);

    if (!existingBrand) {
        throw new AppError("Brand not found", 404);
    }

    if (data.name && data.name !== existingBrand.name) {
        const existingName = await findBrandByName(data.name);

        if (existingName) {
            throw new AppError("Brand name already exists", 409);
        }
    }

    if (data.slug && data.slug !== existingBrand.slug) {
        const existingSlug = await findBrandBySlug(data.slug);

        if (existingSlug) {
            throw new AppError("Brand Slug already exists", 409);
        }
    }
    return updateBrand(id, data);
};

export const deleteBrandService = async (id: string) => {
    const existingBrand = await findBrandById(id);

    if (!existingBrand) {
        throw new AppError("Brand not found", 404);
    }

    return deleteBrand(id);
};