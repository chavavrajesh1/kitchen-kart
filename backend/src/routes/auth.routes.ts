import { Router } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validate.js";
import { register, login } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js"
import { getProfile } from "../controllers/auth.controller.js";

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

router.get(
    "/profile",
    authenticate,
    getProfile
)

export default router;