import { Router } from "express";
import { createCategorySchema, updateCategorySchema } from "../schemas/category.schema.js";
import { validate } from "../middlewares/validate.js";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller.js";

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

router.patch(
    "/:id",
    validate(updateCategorySchema),
    updateCategory
);

router.delete(
    "/:id",
    deleteCategory
)

export default router;