import { Router } from "express";
import { createCategorySchema } from "../schemas/category.schema.js";
import { validate } from "../middlewares/validate.js";
import { createCategory } from "../controllers/category.controller.js";

const router = Router();

router.post(
    "/",
    validate(createCategorySchema),
    createCategory
);

export default router;