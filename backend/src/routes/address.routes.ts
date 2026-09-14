import {Router} from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createAddressController, deleteAddressController, getAddressesController, updateAddressController } from "../controllers/address.controller";
import { createAddressSchema, updateAddressSchema } from "../schemas/address.schema";
import { validate } from "../middlewares/validate";

const router = Router();

router.post(
    "/",
    authenticate,
    validate(createAddressSchema),
    createAddressController,
);

router.get(
    "/",
    authenticate,
    getAddressesController,
);

router.patch(
    "/:addressId",
    authenticate,
    validate(updateAddressSchema),
    updateAddressController,
);

router.delete(
    "/:addressId",
    authenticate,
    deleteAddressController,
);


export default router;