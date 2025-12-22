import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers";
import { validate } from "../middleware/validate";
import {
  createOrderSchema,
  updateOrderSchema,
  getOrderByIdSchema,
} from "../schemas/orderSchemas";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/", validate(createOrderSchema), createOrder);
orderRouter.get("/:id", validate(getOrderByIdSchema), getOrderById);
orderRouter.put("/:id", validate(updateOrderSchema), updateOrder);
orderRouter.delete("/:id", validate(getOrderByIdSchema), deleteOrder);

export default orderRouter;
