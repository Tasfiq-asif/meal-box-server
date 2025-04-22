import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { customerProfileService } from "./customerProfile.service";

const profile = catchAsync(async (req: Request, res: Response) => {
  const profileData = req.body;
  const profile = await customerProfileService.profile(profileData);
  sendResponse(res, {
    statusCode: 201,
    message: "customer profile successfully",
    data: profile,
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

export const ProfileController = {
  profile,
  getcustomerprofile,
  getProfileByUserId,
};
