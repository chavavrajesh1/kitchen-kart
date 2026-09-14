import { z } from "zod";

export const createAddressSchema = z.object({
    fullName: z.string().min(2).max(100),

    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),

    addressLine1: z.string().min(5).max(200),

    addressLine2: z.string().max(200).optional(),

    city: z.string().min(2).max(100),

    state: z.string().min(2).max(100),

    postalCode: z.string().regex(/^\d{6}$/, "Invalid postal code"),

    country: z.string().min(2).max(100).default("India"),

    isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();