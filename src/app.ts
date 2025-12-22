import { connectDB } from "./db/index";
import apiRouter from "./routers/index";
import type { ApiError } from "./types";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api", apiRouter);

// centralized error handler
app.use(
  (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);

    const statusCode = err.statusCode ?? 500;
    const message =
      statusCode === 500 ? "Internal server error" : err.message;

    res.status(statusCode).json({
      error: {
        message,
      },
    });
  }
);


const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
