import z from "zod";

export const createBrandSchema = z.object({
    name: z.string().trim().min(2, "Brand name must be atleast 2 characters").max(100,"Brand name must not exceed 100 characters"),

    slug: z.string().trim().min(2, "Brand slug must be atleast 2 characters").max(100,"Brand name must not exceed 100 characters"),

    description: z.string().trim().max(500,"Description must not exceed 500 characters").optional(),
});