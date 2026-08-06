import { Router } from "express";
import { createCategorySchema } from "../schemas/category.schema.js";
import { validate } from "../middlewares/validate.js";
import { createCategory, getCategories, getCategoryById } from "../controllers/category.controller.js";

const router = Router();

router.post(
    "/",
    validate(createCategorySchema),
    createCategory
);

router.get(
    "/",
    getCategories
);

router.get(
    "/:id",
    getCategoryById
);

export default router;