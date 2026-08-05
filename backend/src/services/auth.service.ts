import bcrypt from 'bcrypt';
import type { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../schemas/auth.schema.js';
import { findUserByEmail, createUser, updatePasswordResetToken, findUserByResetPasswordToken, updateUserPassword } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from './email.service.js';

export const registerUser = async (data: RegisterInput) => {
    const { firstName, lastName, email, password } = data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new AppError('User with this email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser({
        firstName,
        ...(lastName !== undefined && { lastName }),
        email,
        password: hashedPassword,
    });
 
    return {
        firstName,
        lastName,
        email,
    };
};

export const loginUser = async (data: LoginInput) => {
    const { email, password } = data;

    // check if user exists
    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    // Compare Password

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
        },
        accessToken: generateAccessToken({
            userId: user.id,
            email: user.email,  
        }),
        refreshToken: generateRefreshToken({
            userId: user.id,
            email: user.email,
        }),
    };
};

export const refreshAccessToken = async (refreshToken: string) => {
    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
        userId: payload.userId,
        email: payload.email,
    });

    return {
        accessToken,
    };
};

export const logoutUser = async () => {
    return {
        message: "Logout successful",
    };
};

export const forgotPassword = async (data: ForgotPasswordInput) => {
    const { email } = data;

    const user = await findUserByEmail(email);

    if (!user) {
        return {
            message: "If an account with that email exists, a password reset link has been sent.",
        };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 15);

    await updatePasswordResetToken(user.id, resetToken, resetTokenExpiry);

    await sendPasswordResetEmail(email, resetToken);

    return {
        message: "Password reset link sent successfully",
    }; 
};

export const resetPassword = async (data: ResetPasswordInput) => {
    const { token, password } = data;

    const user = await findUserByResetPasswordToken(token);

    if (!user) {
        throw new AppError("Invalid or expired reset token", 400);
    }

    if (!user.resetPasswordExpiry || user.resetPasswordExpiry < new Date()) {
        throw new AppError("Reset token has expired", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await updateUserPassword(user.id, hashedPassword);

    return {
        message: "Password has been reset successfully",
    };
};