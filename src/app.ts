import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./app/modules/user/user.route";
import { authRouter } from "./app/modules/auth/auth.route";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// Global error handler
app.use(errorHandler);

export default app;
