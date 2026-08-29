import prisma from "../lib/prisma.js";

export const findCartByUserId = async (userId: string) => {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
  });
};

export const createCart = async (userId: string) => {
  return prisma.cart.create({
    data: {
      userId,
    },
  });
};

export const findCartItem = async (cartId: string, productId: string) => {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
  });
};

export const createCartItem = async (
  cartId: string,
  productId: string,
  quantity: number,
) => {
  return prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  });
};

export const updateCartItemQuantity = async (
    cartItemId: string, quantity: number,
) => {
    return prisma.cartItem.update({
        where: {
            id: cartItemId,
        },
        data: {
            quantity,
        },
    });
};

export const getCartWithItems = async (cartId: string) => {
    return prisma.cart.findUnique({
        where: {
            id: cartId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
};

export const deleteCartItem = async (cartItemId: string) => {
    return prisma.cartItem.delete({
        where: {
            id: cartItemId,
        },
    });
};

export const deleteAllCartItems = async (cartId: string)  => {
    return prisma.cartItem.deleteMany({
        where: {
            cartId,
        },
    });
};