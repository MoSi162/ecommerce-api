import { Request, Response, NextFunction } from "express";
import { Order, User, Product } from "../models";

export const getAllOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: { message: "Order not found" } });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, products } = req.body;

    // FR017: validate userId exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: { message: "Invalid userId" } });
    }

    // FR017: validate all productIds exist and FR018: calculate total
    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({
          error: { message: `Invalid productId: ${item.productId}` },
        });
      }
      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, products } = req.body;

    // FR017: validate userId if provided
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ error: { message: "Invalid userId" } });
      }
    }

    // FR017 & FR018: validate products and recalculate total if products provided
    let total: number | undefined;
    if (products) {
      total = 0;
      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(400).json({
            error: { message: `Invalid productId: ${item.productId}` },
          });
        }
        total += product.price * item.quantity;
      }
    }

    const updateData: any = {};
    if (userId) updateData.userId = userId;
    if (products) {
      updateData.products = products;
      updateData.total = total;
    }

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ error: { message: "Order not found" } });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: { message: "Order not found" } });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
