// src/app/modules/mealMenu/route/mealMenu.route.ts
import express from "express";
import auth, { protect } from "../../../middleware/auth.middleware";
import { MealMenuController } from "./meal.controller";
import { MealValidation } from "./meal.validation";
import { validateRequest } from "../../../middleware/validateRequest";
import multer from "multer";

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 5MB
  },
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const router = express.Router();

router.post(
  "/",
  auth("provider"),
  validateRequest(MealValidation.createMealValidationSchema),
  MealMenuController.createMeal
);

// Route for creating a meal with an image
router.post(
  "/with-image",
  auth("provider"),
  upload.single("image"),
  MealMenuController.createMealWithImage
);

router.put(
  "/:mealId",
  auth("provider"),
  validateRequest(MealValidation.updateMealValidationSchema),
  MealMenuController.updateMeal
);

// Route for updating a meal with an image
router.put(
  "/:mealId/with-image",
  auth("provider"),
  upload.single("image"),
  MealMenuController.updateMealWithImage
);

router.delete("/:mealId", auth("provider"), MealMenuController.deleteMeal);

router.get(
  "/user/:userId",
  auth("provider"),
  MealMenuController.getProviderMeals
);

// Route to get all available meals
router.get("/", MealMenuController.getAllMeals);

// Add to your meal.route.ts for testing
router.get("/test-auth", protect, (req, res) => {
  res.json({
    message: "Auth successful",
    user: req.user,
  });
});

export const MealRouter = router;
