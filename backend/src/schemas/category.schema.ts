import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(2, "Category name must be atleast 2 characters").max(100, "Category name must not exceed 100 characters"),

    description: z.string().trim().max(500, "Description must not exceed 500 characters").optional(),

    image: z.string().trim().url("Invalid image URL").optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;