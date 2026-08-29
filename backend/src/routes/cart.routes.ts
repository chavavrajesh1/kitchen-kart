import { Router } from "express";
import { addToCart, clearCart, getCart, removeFromCart, updateCartItemQuantity } from "../controllers/cart.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { addToCartSchema, updateCartItemQuantitySchema } from "../schemas/cart.schema";
import { validate } from "../middlewares/validate";

const router = Router();

router.get("/", authenticate, getCart);

router.post(
    "/items", 
    authenticate, 
    validate(addToCartSchema),
    addToCart,
);

router.patch(
    "/items/:productId",
    authenticate,
    validate(updateCartItemQuantitySchema),
    updateCartItemQuantity,
);

router.delete(
    "/items/:productId",
    authenticate,
    removeFromCart,
);

router.delete("/", authenticate, clearCart);

export default router;

