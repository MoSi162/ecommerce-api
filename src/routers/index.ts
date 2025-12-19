import { Router } from "express";

// inline minimal userRouter to avoid missing module error
const userRouter = Router();
userRouter.get("/", (req, res) => {
  res.json({ message: "users root" });
});

const apiRouter = Router();

apiRouter.use("/users", userRouter);
// later: /products, /categories, /orders

export default apiRouter;
