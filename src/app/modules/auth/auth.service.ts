// src/app/modules/auth/auth.service.ts
import { UserService } from "../user/user.service";
import { TUser } from "../user/user.interface";
import jwt from 'jsonwebtoken';
import config from "../../../app/config";

// Login user and return the user if credentials are valid
const login = async (
  email: string,
  password: string
): Promise<{ user: TUser; accessToken: string } | null> => {
  // Find user by email
  const user = await UserService.findUserByEmail(email);
  if (!user) {
    return null;
  }

  // Check if password matches
  const isMatch = await UserService.comparePasswords(user, password);
  if (!isMatch) {
    return null;
  }

  // Generate JWT token
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt_secret || 'your-secret-key',
    { expiresIn: '1d' }
  );

  return { user, accessToken };
};

// Validate if a token is valid by checking if the user exists
const validateToken = async (userId: string): Promise<TUser | null> => {
  return await UserService.findUserById(userId);
};

export const AuthService = {
  login,
  validateToken,
};