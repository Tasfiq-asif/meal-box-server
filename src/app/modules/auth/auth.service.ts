import { UserService } from "../user/user.service";
import { TUser } from "../user/user.interface";

// Login user and return the user if credentials are valid
const login = async (
  email: string,
  password: string
): Promise<TUser | null> => {
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

  return user;
};

// Validate if a token is valid by checking if the user exists
const validateToken = async (userId: string): Promise<TUser | null> => {
  return await UserService.findUserById(userId);
};

export const AuthService = {
  login,
  validateToken,
};
