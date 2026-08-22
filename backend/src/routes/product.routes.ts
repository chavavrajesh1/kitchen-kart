import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";

const router = Router();

router.post(
    "/",
    validate(createProductSchema),
    createProduct
);

router.get(
    "/",
    getAllProducts
);

router.get(
    "/:id", getProductById
);

router.put(
    "/:id",
    validate(updateProductSchema),
    updateProduct
);

router.delete(
    "/:id", deleteProduct
);

export default router;