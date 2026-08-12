import { Router } from "express";
import { createBrand } from "../controllers/brand.controller.js";
import { validate } from "../middlewares/validate.js";
import { createBrandSchema } from "../schemas/brand.schema.js";

const router = Router();

router.post(
    "/", 
    validate(createBrandSchema),
    createBrand
);

export default router;