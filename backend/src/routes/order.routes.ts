import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createOrder, getOrderById, getOrders, updateOrderStatusController, cancelOrderController } from "../controllers/order.controller";
import { updateOrderStatusSchema } from "../schemas/order.schema";
import { validate } from "../middlewares/validate";
import { authorizeAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.post(
    "/", authenticate, createOrder,
);

router.get(
    "/", authenticate, getOrders,
);

router.get(
    "/:orderId", authenticate, getOrderById,
);

router.patch(
    "/:orderId/status", authenticate ,authorizeAdmin , validate(updateOrderStatusSchema), updateOrderStatusController,
);

router.patch(
    "/:orderId/cancel", authenticate, cancelOrderController,
);

export default router;