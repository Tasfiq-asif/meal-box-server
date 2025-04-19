import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

// Login user
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await AuthService.login(email, password);
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid email or password",
    });
  }

  // Remove sensitive information before sending
  const userData = (user as any).toJSON ? (user as any).toJSON() : { ...user };
  if (userData.password) delete userData.password;

  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: userData,
  });
});

// Register a new user
const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role, phone, address } = req.body;

  // Check if password and confirmPassword match
  if (password !== req.body.confirmPassword) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Passwords do not match",
    });
  }

  // Check if user already exists
  const existingUser = await UserService.findUserByEmail(email);
  if (existingUser) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Email is already in use",
    });
  }

  // Create new user
  const user = await UserService.register({
    name,
    email,
    password,
    role,
    phone,
    address,
  });

  // Remove sensitive information before sending
  const userData = (user as any).toJSON ? (user as any).toJSON() : { ...user };
  if (userData.password) delete userData.password;

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: userData,
  });
});

// Get current authenticated user
const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "You are not authenticated",
    });
  }

  const userId = req.user.id || (req.user._id && req.user._id.toString());

  if (!userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "User ID not found",
    });
  }

  const user = await UserService.findUserById(userId);

  if (!user) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: user,
  });
});

// Logout user
const logout = catchAsync(async (req: Request, res: Response) => {
  // Clear token cookie
  res.clearCookie("token");

  sendResponse(res, {
    statusCode: 200,
    message: "Logged out successfully",
  });
});

export const AuthController = {
  login,
  register,
  getMe,
  logout,
};
