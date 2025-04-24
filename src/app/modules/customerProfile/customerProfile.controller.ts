import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { customerProfileService } from "./customerProfile.service";

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updateData = req.body;

  // First check if profile exists
  const existingProfile = await customerProfileService.getProfileByUserId(
    userId
  );

  if (!existingProfile) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Customer profile not found",
    });
  }

  // Update the profile
  const updatedProfile = await customerProfileService.updateProfile(
    userId,
    updateData
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer profile updated successfully",
    data: updatedProfile,
  });
});

const getcustomerprofile = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.params.customerId;
  const customerdata = await customerProfileService.getprofile(customerId);
  sendResponse(res, {
    statusCode: 200,
    message: "customer profile get successfully",
    data: customerdata,
  });
});

const getProfileByUserId = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const customerdata = await customerProfileService.getProfileByUserId(userId);

  if (!customerdata) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Customer profile not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Customer profile retrieved successfully",
    data: customerdata,
  });
});

const getAllCustomerProfiles = catchAsync(
  async (req: Request, res: Response) => {
    const profiles = await customerProfileService.getAllProfiles();

    sendResponse(res, {
      statusCode: 200,
      message: "All customer profiles retrieved successfully",
      data: profiles,
    });
  }
);

export const ProfileController = {
  updateProfile,
  getcustomerprofile,
  getProfileByUserId,
  getAllCustomerProfiles,
};
