import { z } from "zod"

export const addToCartSchema = z.object({
    productId: z.uuid(),
    quantity: z.number().int().min(1),
});

export const updateCartItemQuantitySchema = z.object({
    quantity: z.number().int().min(1),
});