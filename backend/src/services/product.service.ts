import { findBrandById } from "../repositories/brand.repository.js";
import { findCategoryById } from "../repositories/category.repository.js";
import {
  createProduct,
  deactiveProduct,
  findAllProducts,
  findProductById,
  findProductByName,
  findProductBySlug,
  updateProduct,
} from "../repositories/product.repository.js";
import { AppError } from "../utils/AppError";

export const createProductService = async (data: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId: string;
  brandId: string;
}) => {
  const existingName = await findProductByName(data.name);

  if (existingName) {
    throw new AppError("Product name already exists", 409);
  }

  const existingSlug = await findProductBySlug(data.slug);

  if (existingSlug) {
    throw new AppError("Product slug already exists", 409);
  }

  const category = await findCategoryById(data.categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const brand = await findBrandById(data.brandId);

  if (!brand) {
    throw new AppError("Brand not found", 404);
  }

  return createProduct(data);
};

export const getAllProductsService = async (
  search: string | undefined,
  categoryId: string | undefined,
  brandId: string | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined,
  skip: number,
  limit: number,
  sortBy: string | undefined,
  sortOrder: string | undefined,
) => {
  const result = await findAllProducts(
    search,
    categoryId,
    brandId,
    minPrice,
    maxPrice,
    skip,
    limit,
    sortBy,
    sortOrder,
  );

  const totalPages = Math.ceil(result.totalProducts / limit);

  const currentPage = Math.floor(skip / limit) + 1;

  if (currentPage > totalPages && totalPages > 0){
    throw new AppError ("Page number exceeds total pages", 400);
  }

  const hasNextPage = currentPage < totalPages;

  const hasPreviousPage = currentPage > 1;

  return {
    ...result,

    currentPage,
    limit,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

export const getProductByIdService = async (id: string) => {
  const product = await findProductById(id);

  if (!product || !product.isActive) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

export const updateProductService = async (
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string | null;
    price?: number;
    stock?: number;
    categoryId?: string;
    brandId?: string;
    isActive?: boolean;
  },
) => {
  const existingProduct = await findProductById(id);

  if (!existingProduct) {
    throw new AppError("Product not found", 404);
  }

  if (data.name && data.name !== existingProduct.name) {
    const existingName = await findProductByName(data.name);

    if (existingName) {
      throw new AppError("Product name already exists", 409);
    }
  }

  if (data.slug && data.slug !== existingProduct.slug) {
    const existingSlug = await findProductBySlug(data.slug);

    if (existingSlug) {
      throw new AppError("Product slug already exists", 409);
    }
  }

  if (data.categoryId) {
    const category = await findCategoryById(data.categoryId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }
  }

  if (data.brandId) {
    const brand = await findBrandById(data.brandId);

    if (!brand) {
      throw new AppError("Brand not found", 404);
    }
  }

  return updateProduct(id, data);
};

export const deleteProductService = async (id: string) => {
  const product = await findProductById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (!product.isActive) {
    throw new AppError("Product is already inactive", 400);
  }

  return deactiveProduct(id);
};
