import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./app/modules/user/user.route";
import { authRouter } from "./app/modules/auth/auth.route";
import { CustomerProfileRouter } from "./app/modules/customerProfile/customerProfile.router";
import { orderRouter } from "./app/modules/order/order.router";
import { mealProviderRouter } from "./app/modules/mealProviderProfile/mealProvider.route";
import { MealRouter } from "./app/modules/mealMenu/meal.route";
//git check
const app: Application = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mealbox-client-nine.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", CustomerProfileRouter);
app.use("/api/v1/providers", mealProviderRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1/meals", MealRouter);

// Global error handler
app.use(errorHandler);

export default app;
