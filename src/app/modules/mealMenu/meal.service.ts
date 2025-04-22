// src/app/modules/mealMenu/service/mealMenu.service.ts
import { MealMenu, IMealMenu } from "../mealMenu/meal.model";
import mongoose from "mongoose";
const createMeal = async (mealData: Partial<IMealMenu>): Promise<IMealMenu> => {
  return await MealMenu.create(mealData);
};

const updateMeal = async (
  mealId: string,
  mealData: Partial<IMealMenu>
): Promise<IMealMenu | null> => {
  return await MealMenu.findByIdAndUpdate(mealId, mealData, { new: true });
};

const deleteMeal = async (mealId: string): Promise<IMealMenu | null> => {
  return await MealMenu.findByIdAndDelete(mealId);
};

const getProviderMeals = async (userId: string): Promise<IMealMenu[]> => {
  return await MealMenu.find({
    userId: new mongoose.Types.ObjectId(userId),
  });
};

const getMealById = async (mealId: string): Promise<IMealMenu | null> => {
  return await MealMenu.findById(mealId);
};

export const MealMenuService = {
  createMeal,
  updateMeal,
  deleteMeal,
  getProviderMeals,
  getMealById,
};
