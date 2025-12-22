import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be positive"),
    categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid categoryId"),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid categoryId")
      .optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

export const getProductsSchema = z.object({
  query: z.object({
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid categoryId")
      .optional(),
  }),
});
