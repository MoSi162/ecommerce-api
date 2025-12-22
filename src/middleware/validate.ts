import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error.issues); // console log für debugging 
        return res.status(400).json({
          error: {
            message: "Validation failed",
            details: error.issues, // Test line 
          },
        });
      }
      next(error);
    }
  };
