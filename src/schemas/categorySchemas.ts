import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

export const getCategoryByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});
