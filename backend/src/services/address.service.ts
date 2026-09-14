import { createAddress, deleteAddress, findAddressByIdandUserId, findAddressesByUserId, updateAddress } from "../repositories/address.repository";
import { AppError } from "../utils/AppError";


export const createUserAddress = async (
    userId: string,
    data: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isDefault: boolean;
    },
) => {
    return createAddress(userId, data);
};

export const getUserAddresses = async (userId: string) => {
    return findAddressesByUserId(userId);
};

export const updateUserAddress = async (
    addressId: string,
    userId: string,
    data: {
        fullName?: string,
        phone?: string;
        addressLine1: string;
        addressLine2: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        isDefault?: boolean;
    },
) => {
    const existingAddress = await findAddressByIdandUserId(addressId, userId);

    if (!existingAddress) {
        throw new AppError ("Address not found", 404);
    }

    return updateAddress(addressId, userId, data);
};

export const deleteUserAddress = async (
    addressId: string,
    userId: string,
) => {
    const existingAddress = await findAddressByIdandUserId(
        addressId, userId,
    );

    if (!existingAddress) {
        throw new AppError("Address not found", 404);
    }

    return deleteAddress(addressId, userId);
};