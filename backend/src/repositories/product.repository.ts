import prisma from "../lib/prisma";

export const findProductByName = async (name: string) => {
  return prisma.product.findFirst({
    where: { name },
  });
};

export const findProductBySlug = async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
  });
};

export const createProduct = async (data: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId: string;
  brandId: string;
}) => {
  return prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock ?? 0,
      categoryId: data.categoryId,
      brandId: data.brandId,
    },
  });
};

export const findAllProducts = async (
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
  const where = {
    isActive: true,

    ...(search && { name: { contains: search, mode: "insensitive" as const } }),
    ...(categoryId && { categoryId: categoryId }),
    ...(brandId && { brandId: brandId }),
    ...((minPrice !== undefined || maxPrice !== undefined) && {
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),

        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    }),
  };

  const allowedSortFields = [
    "price",
    "name",
    "createdAt",
    "stock",
  ] as const;

  const validSortBy : (typeof allowedSortFields) [number] = allowedSortFields.includes(
    sortBy as (typeof allowedSortFields)[number],
  ) ? (sortBy as (typeof allowedSortFields)[number]) : "createdAt" ;

  const validSortOrder = sortOrder === "asc" || sortOrder === "desc" ? sortOrder : "desc";

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,

      orderBy: {
        [validSortBy] : validSortOrder
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    products,
    totalProducts,
  };
};

export const findProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (
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
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deactiveProduct = async (id: string) => {
  return prisma.product.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};
