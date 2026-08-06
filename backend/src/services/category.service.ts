import slugify from "slugify";
import { CreateCategoryInput } from "../schemas/category.schema.js";
import { findCategoryByName, findCategoryBySlug, createCategory, getAllCategories, findCategoryById } from "../repositories/category.repository.js";
import { AppError } from "../utils/AppError.js";

export const createNewCategory = async (data: CreateCategoryInput) => {
    const existingCategory = await findCategoryByName(data.name);

    if (existingCategory) {
        throw new AppError("Category already exists", 400);
    }

    const slug = slugify(data.name, {
        lower: true,
        strict: true,
        trim: true,
    });

    const existingSlug = await findCategoryBySlug(slug);

    if (existingSlug) {
        throw new AppError("Category slug already exists", 400);
    }

    const category = await createCategory({
        ...data,
        slug
    });

    return category;

};

export const getCategories = async () => {
    console.log("Service Called");
    return await getAllCategories();
};

export const getCategoryById = async (id: string) => {
     const category = await findCategoryById(id);

     if (!category) {
        throw new AppError("Category not found", 404);
     }

     return category;
}