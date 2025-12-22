import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers";
import { validate } from "../middleware/validate";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoryByIdSchema,
} from "../schemas/categorySchemas";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", validate(createCategorySchema), createCategory);
categoryRouter.get("/:id", validate(getCategoryByIdSchema), getCategoryById);
categoryRouter.put("/:id", validate(updateCategorySchema), updateCategory);
categoryRouter.delete("/:id", validate(getCategoryByIdSchema), deleteCategory);

export default categoryRouter;
