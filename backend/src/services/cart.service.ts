import prisma from "../lib/prisma";
import {
  createCart,
  createCartItem,
  deleteAllCartItems,
  deleteCartItem,
  findCartByUserId,
  findCartItem,
  getCartWithItems,
  updateCartItemQuantity,
} from "../repositories/cart.repository";
import { findProductById } from "../repositories/product.repository";
import { AppError } from "../utils/AppError";

export const getOrCreateCartService = async (userId: string) => {
  let cart = await findCartByUserId(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  return cart;
};

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
    if (quantity < 1){
        throw new AppError("Quantity must be at least 1", 400);
    }

  const product = await findProductById(productId);

  if (!product || !product.isActive) {
    throw new AppError("Product not found", 404);
  }

  const cart = await getOrCreateCartService(userId);


  if (quantity > product.stock) {
    throw new AppError(
        `Only ${product.stock} items available in stock`, 400,
    );
  }

  const existingCartItem = await findCartItem(cart.id, productId);

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + quantity;

    if (newQuantity > product.stock) {
        throw new AppError(
            `Only ${product.stock} items available in stock`,400,
        );
    }

    return updateCartItemQuantity(
      existingCartItem.id,
      existingCartItem.quantity + quantity,
    );
  }

  return createCartItem(cart.id, productId, quantity);
};

export const getCartService = async (userId: string) => {
    const cart = await findCartByUserId(userId);

    if (!cart){
        return null;
    }

    return getCartWithItems(cart.id);
};

export const removeFromCartService = async (
    userId: string,
    productId: string,
) => {
    const cart = await findCartByUserId(userId);

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const cartItem = await findCartItem(
        cart.id, productId,
    );

    if (!cartItem) {
        throw new AppError("Product not found in cart", 404);
    }

    return deleteCartItem(cartItem.id);
};

export const updateCartItemQuantityService = async (
    userId: string,
    productId: string,
    quantity: number,
) => {
    if (quantity < 1) {
        throw new AppError("Quantiy must be at least 1", 400);
    }

    const cart = await findCartByUserId(userId);

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const cartItem = await findCartItem(
        cart.id,
        productId,
    );

    if (!cartItem) {
        throw new AppError("Product not found in cart", 404);
    }

    const product = await findProductById(productId);

    if (!product || !product.isActive) {
        throw new AppError("Product not found", 404);
    }

    if (quantity > product.stock) {
        throw new AppError(
            `Only ${product.stock} items available in stock`, 400,
        );
    }


    return updateCartItemQuantity(
        cartItem.id,
        quantity,
    );
};

export const clearCartService = async (userId: string) => {
    const cart = await findCartByUserId(userId);

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    return deleteAllCartItems(cart.id);
};