import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import catchAsync from "../../../utils/catchAsync";

// Login user
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await AuthService.login(email, password);
  if (!user) {
    res.status(401).json({
      status: "fail",
      message: "Invalid credentials",
    });
    return;
  }

  // Send user response
  UserService.sendUserResponse(user, 200, res);
});

// Register a new user
const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role, phone, address } = req.body;

  // Check if password and confirmPassword match
  if (password !== req.body.confirmPassword) {
    res.status(400).json({
      status: "fail",
      message: "Passwords do not match",
    });
    return;
  }

  // Check if user already exists
  const existingUser = await UserService.findUserByEmail(email);
  if (existingUser) {
    res.status(400).json({
      status: "fail",
      message: "Email already in use",
    });
    return;
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

  // Send user response
  UserService.sendUserResponse(user, 201, res);
});

// Get current authenticated user
const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      status: "fail",
      message: "Not authorized",
    });
  }

  const userId = req.user.id || (req.user._id && req.user._id.toString());

  if (!userId) {
    return res.status(401).json({
      status: "fail",
      message: "User ID not found",
    });
  }

  const user = await UserService.findUserById(userId);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Logout user
const logout = catchAsync(async (req: Request, res: Response) => {
  // Clear token cookie
  res.clearCookie("token");

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

export const AuthController = {
  login,
  register,
  getMe,
  logout,
};
