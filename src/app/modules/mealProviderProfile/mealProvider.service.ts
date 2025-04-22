// src/app/modules/mealProvider/service/mealProvider.service.ts

import { IMealProvider, MealProvider } from "./mealProvider.model";

const createOrUpdateProfile = async (
  providerData: IMealProvider
): Promise<IMealProvider | null> => {
  const { userId, cuisineSpecialties, pricing, experience, availability } =
    providerData;

  const result = await MealProvider.findOneAndUpdate(
    { userId },
    { cuisineSpecialties, pricing, experience, availability },
    { new: true, upsert: true }
  );

  if (!result) return null;

  const populatedResult = await result.populate({
    path: "userId",
    select: "name email phone address role",
  });

  return populatedResult.toObject() as IMealProvider;
};

const getProviderById = async (
  providerId: string
): Promise<IMealProvider | null> => {
  const result = await MealProvider.findById(providerId).populate({
    path: "userId",
    select: "name email phone address role",
  });

  return result ? (result.toObject() as IMealProvider) : null;
};

const getProviderByUserId = async (
  userId: string
): Promise<IMealProvider | null> => {
  const result = await MealProvider.findOne({ userId }).populate({
    path: "userId",
    select: "name email phone address role",
  });

  return result ? (result.toObject() as IMealProvider) : null;
};

const getAllProviders = async (): Promise<IMealProvider[]> => {
  const results = await MealProvider.find().populate({
    path: "userId",
    select: "name email phone address role",
  });

  return results.map((result) => result.toObject() as IMealProvider);
};

export const MealProviderService = {
  createOrUpdateProfile,
  getProviderById,
  getProviderByUserId,
  getAllProviders,
};
