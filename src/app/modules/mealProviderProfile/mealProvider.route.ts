// src/app/modules/mealProvider/route/mealProvider.route.ts
import express from "express";
import { MealProviderController } from "./mealProvider.controller";

const router = express.Router();

// Update provider profile
router.put("/profile", MealProviderController.updateProfile);

// Get provider by provider ID
router.get("/provider/:id", MealProviderController.getProviderProfile);

// Get provider profile by user ID
router.get("/user/:userId", MealProviderController.getProviderByUserId);

export const mealProviderRouter = router;
