// src/app/modules/mealProvider/service/mealProvider.service.ts

import { IMealProvider, MealProvider } from "./mealProvider.model";

const createOrUpdateProfile = async (
  providerData: IMealProvider
): Promise<IMealProvider | null> => {
  const { userId, cuisineSpecialties, pricing, experience, availability } =
    providerData;
  return await MealProvider.findOneAndUpdate(
    { userId },
    { cuisineSpecialties, pricing, experience, availability },
    { new: true, upsert: true }
  );
};

const getProviderById = async (
  providerId: string
): Promise<IMealProvider | null> => {
  return await MealProvider.findById(providerId).populate({
    path: "userId",
    select: "name email phone address", // Only return these fields from User model
  });
};

const getProviderByUserId = async (
  userId: string
): Promise<IMealProvider | null> => {
  return await MealProvider.findOne({ userId }).populate({
    path: "userId",
    select: "name email phone address", // Only return these fields from User model
  });
};

export const MealProviderService = {
  createOrUpdateProfile,
  getProviderById,
  getProviderByUserId,
};
