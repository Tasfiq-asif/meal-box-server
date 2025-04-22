import { Request, Response } from "express";
import { MealProviderService } from "./mealProvider.service";

const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile = await MealProviderService.createOrUpdateProfile(req.body);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getProviderProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await MealProviderService.getProviderById(id);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Provider not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getProviderByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = await MealProviderService.getProviderByUserId(userId);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Provider not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const providers = await MealProviderService.getAllProviders();
    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const MealProviderController = {
  updateProfile,
  getProviderProfile,
  getProviderByUserId,
  getAllProviders,
};
