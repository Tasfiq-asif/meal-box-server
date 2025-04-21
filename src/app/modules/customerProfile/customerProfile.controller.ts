import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";


const profile = catchAsync(async (req: Request, res: Response) => {
    
  const profileData = req.body;

  sendResponse(res, {
    statusCode: 201,
    message: "customer profile successfully",
    data: profileData,
  });
});

export const ProfileController = {
    profile,
  };