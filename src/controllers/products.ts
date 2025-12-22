import { Request, Response, NextFunction } from "express";
import { Product, Category } from "../models";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { categoryId } : {};
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ error: { message: "Product not found" } });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // FR016: validate categoryId exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(400)
        .json({ error: { message: "Invalid categoryId" } });
    }

    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // FR016: validate categoryId if provided
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res
          .status(400)
          .json({ error: { message: "Invalid categoryId" } });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, categoryId },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ error: { message: "Product not found" } });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ error: { message: "Product not found" } });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
