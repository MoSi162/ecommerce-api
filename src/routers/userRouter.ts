import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
} from "../schemas/userSchemas";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", validate(createUserSchema), createUser);
userRouter.get("/:id", validate(getUserByIdSchema), getUserById);
userRouter.put("/:id", validate(updateUserSchema), updateUser);
userRouter.delete("/:id", validate(getUserByIdSchema), deleteUser);

export default userRouter;
