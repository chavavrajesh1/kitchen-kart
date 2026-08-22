import z from "zod";

export const createProductSchema = z.object({
    name: z.string().trim().min(2, "Product name must be atleast 2 characters").max(150, "Product name must not exceed 150 characters"),

    slug: z.string().trim().min(2, "Product slug must be atleast 2 characters").max(150, "Product slug must not exceed 150 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers and hyphens"),

    description: z.string().trim().max(1000, "Description must not exceed 1000 characters").optional(),

    price: z.number().positive("Price must be greater than 0"),

    stock: z.number().int("Stock must be a whole number").min(0, "Stock cannot be negative").optional(),

    categoryId: z.string().uuid("Invalid Category ID"),

    brandId: z.string().uuid("Invalid brand ID"),
});

export const updateProductSchema = createProductSchema.partial().extend({
    isActive: z.boolean().optional(),
});