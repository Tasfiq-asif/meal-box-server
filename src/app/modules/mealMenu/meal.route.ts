// src/app/modules/mealMenu/route/mealMenu.route.ts
import express from "express";
import auth from "../../../middleware/auth.middleware";
import { MealMenuController } from "./meal.controller";
import { MealValidation } from "./meal.validation";
import { validateRequest } from "../../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",
  auth("provider"),
  validateRequest(MealValidation.createMealValidationSchema),
  MealMenuController.createMeal
);

router.put(
  "/:mealId",
  auth("provider"),
  validateRequest(MealValidation.updateMealValidationSchema),
  MealMenuController.updateMeal
);

router.delete("/:mealId", auth("provider"), MealMenuController.deleteMeal);
router.get(
  "/user/:userId",
  auth("provider"),
  MealMenuController.getProviderMeals
);

export const MealRouter = router;
