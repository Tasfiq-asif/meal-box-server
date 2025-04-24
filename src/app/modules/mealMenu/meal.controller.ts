// src/app/modules/mealMenu/controller/mealMenu.controller.ts
import { Request, Response } from "express";
import { MealMenuService } from "./meal.service"; // Adjust the import path as needed
import { uploadToImgBB } from "../../utils/imgbb";

interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Adjust based on your user object structure
  file?: Express.Multer.File; // Add this for file uploads
}

const createMeal = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Add the userId from the authenticated user
    const mealData = {
      ...req.body,
      userId: req.user?.id,
    };
    const meal = await MealMenuService.createMeal(mealData);
    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const createMealWithImage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // Parse the meal data from the request body
    let mealData;
    try {
      mealData = JSON.parse(req.body.mealData);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal data format",
      });
    }

    // Add the userId from the authenticated user
    mealData.userId = req.user?.id;

    // Upload the image to ImgBB
    const imageUrl = await uploadToImgBB(
      req.file.buffer,
      req.file.originalname
    );

    // Add the image URL to the meal data
    mealData.imageUrl = imageUrl;

    // Create the meal with the image URL
    const meal = await MealMenuService.createMeal(mealData);
    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const updateMeal = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const meal = await MealMenuService.getMealById(req.params.mealId);
    if (!meal) {
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });
    }

    if (!req.user || meal.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updatedMeal = await MealMenuService.updateMeal(
      req.params.mealId,
      req.body
    );
    res.status(200).json({ success: true, data: updatedMeal });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const updateMealWithImage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Find the meal
    const meal = await MealMenuService.getMealById(req.params.mealId);
    if (!meal) {
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });
    }

    // Check authorization
    if (!req.user || meal.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Parse the meal data from the request body
    let mealData;
    try {
      mealData = req.body.mealData ? JSON.parse(req.body.mealData) : {};
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal data format",
      });
    }

    // If an image was uploaded, process it
    if (req.file) {
      const imageUrl = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname
      );
      mealData.imageUrl = imageUrl;
    }

    // Update the meal
    const updatedMeal = await MealMenuService.updateMeal(
      req.params.mealId,
      mealData
    );
    res.status(200).json({ success: true, data: updatedMeal });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const deleteMeal = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const meal = await MealMenuService.getMealById(req.params.mealId);
    if (!meal) {
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });
    }

    if (!req.user || meal.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await MealMenuService.deleteMeal(req.params.mealId);
    res.status(204).send();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getProviderMeals = async (req: Request, res: Response) => {
  try {
    const meals = await MealMenuService.getProviderMeals(req.params.userId);
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const meals = await MealMenuService.getAllMeals();
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const MealMenuController = {
  createMeal,
  createMealWithImage,
  updateMeal,
  updateMealWithImage,
  deleteMeal,
  getProviderMeals,
  getAllMeals,
};
