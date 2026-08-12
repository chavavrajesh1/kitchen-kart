import { Router } from "express";
import { createBrand, deleteBrandController, getAllBrands, getBrandById, updateBrandController } from "../controllers/brand.controller.js";
import { validate } from "../middlewares/validate.js";
import { createBrandSchema, updateBrandSchema } from "../schemas/brand.schema.js";

const router = Router();

router.post(
    "/", 
    validate(createBrandSchema),
    createBrand
);

router.get(
    "/", 
    getAllBrands
);

router.get(
    "/:id",
    getBrandById
);

router.put(
    "/:id",
    validate(updateBrandSchema),
    updateBrandController
);

router.delete(
    "/:id",
    deleteBrandController
);

export default router;