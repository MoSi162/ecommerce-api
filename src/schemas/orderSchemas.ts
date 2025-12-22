import { z } from "zod";

const orderProductSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid productId"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid userId"),
    products: z
      .array(orderProductSchema)
      .min(1, "Order must contain at least one product"),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    userId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid userId")
      .optional(),
    products: z.array(orderProductSchema).min(1).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

export const getOrderByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});
