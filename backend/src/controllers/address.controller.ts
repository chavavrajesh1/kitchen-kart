import { Request, Response } from "express";
import { createUserAddress, deleteUserAddress, getUserAddresses, updateUserAddress } from "../services/address.service";

export const createAddressController = async (
    req: Request, res: Response,
) => {
    const userId = req.user.userId;

    const address = await createUserAddress(userId, req.body);

    res.status(201).json({
        success: true,
        message: "Address created successfully",
        data: address,
    });
};

export const getAddressesController = async (
    req: Request, res: Response,
) => {
    const userId = req.user.userId;

    const addresses = await getUserAddresses(userId);

    res.status(200).json({
        success: true,
        data: addresses
    });
};

export const updateAddressController = async (
    req: Request, res: Response,
) => {
    const userId = req.user.userId;
    const  addressId  = req.params.addressId as string;

    const address = await updateUserAddress(
        addressId,
        userId,
        req.body,
    );

    res.status(200).json({
        success: true,
        message: "Address update successfully",
        data: address,
    });
};

export const deleteAddressController = async (
    req: Request, res: Response,
) => {
    const userId = req.user.userId;
    const addressId = req.params.addressId as string;

    await deleteUserAddress(addressId, userId);

    res.status(200).json({
        success: true,
        message: "Address deleted successfully",
    })
};