import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().trim().min(2, "First Name must be atleast 2 characters long").max(50, "First Name must not exceed 50 characters"),

    lastName: z.string().trim().max(50, "Last Name must not exceed 50 characters").optional(),

    email: z.string().trim().toLowerCase().email("Invalid email address"),

    password: z.string().min(8, "Password must be atleast 8 characters").max(72, "Password must not exceed 72 characters"),

    confirmPassword: z.string().min(8, "Confirm Password must be atleast 8 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 characters").max(72, "Password must not exceed 72 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;