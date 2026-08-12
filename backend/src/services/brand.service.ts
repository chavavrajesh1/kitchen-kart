import { createBrand, findBrandByName, findBrandBySlug } from "../repositories/brand.repository";
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