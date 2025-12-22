import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers";
import { validate } from "../middleware/validate";
import {
  createProductSchema,
  updateProductSchema,
  getProductByIdSchema,
  getProductsSchema,
} from "../schemas/productSchemas";

const productRouter = Router();

productRouter.get("/", validate(getProductsSchema), getAllProducts);
productRouter.post("/", validate(createProductSchema), createProduct);
productRouter.get("/:id", validate(getProductByIdSchema), getProductById);
productRouter.put("/:id", validate(updateProductSchema), updateProduct);
productRouter.delete("/:id", validate(getProductByIdSchema), deleteProduct);

export default productRouter;
