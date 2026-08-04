import bcrypt from 'bcrypt';
import type { RegisterInput, LoginInput } from '../schemas/auth.schema.js';
import { findUserByEmail, createUser } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

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

