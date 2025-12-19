import { Request, Response, NextFunction } from "express";
import { User } from "#models";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ error: { message: "Email already in use" } });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
