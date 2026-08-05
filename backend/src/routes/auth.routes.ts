import { Router } from "express";
import { loginSchema, registerSchema, refreshTokenSchema, forgotPasswordSchema, resetPasswordSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validate.js";
import { register, login, refresh, logout, getProfile, forgotPasswordController, resetPasswordController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js"

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
)

router.post(
    "/refresh",
    validate(refreshTokenSchema),
    refresh
)

router.post(
    "/logout",
    authenticate,
    logout
);

router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    forgotPasswordController
);

router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    resetPasswordController
);

router.get(
    "/profile",
    authenticate,
    getProfile
)

export default router;