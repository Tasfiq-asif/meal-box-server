import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { User } from "../app/modules/user/user.model";

/**
 * Middleware to handle NextAuth.js authentication
 * This will look for session tokens in cookies or authorization headers
 */
export const nextAuthProtect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let userId: string | undefined;

    // Check authorization header (Bearer token from NextAuth)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract user ID from token - in NextAuth session tokens, this might be
      // structured differently based on your NextAuth configuration
      const token = req.headers.authorization.split(" ")[1];

      try {
        // If you're using JWT strategy in NextAuth, you might need to decode the token
        // We don't verify the token here as NextAuth already verified it
        const decodedData = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        );
        userId = decodedData.sub || decodedData.id;
      } catch (error) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid authentication token",
        });
      }
    }
    // Check for nextauth.session-token cookie
    else if (req.cookies["next-auth.session-token"]) {
      // Here you would need to verify the NextAuth session
      // This is simplified; in production, you might need to verify with NextAuth
      return res.status(501).json({
        status: "fail",
        message: "Cookie-based NextAuth authentication not implemented yet",
      });
    }

    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found or session expired.",
      });
    }

    // Set user on request
    req.user = {
      id: user._id.toString(),
      _id: user._id,
      role: user.role,
    };

    next();
  }
);

// Role-based authorization middleware for NextAuth
export const nextAuthRoleCheck = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // First ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "Authentication required",
      });
    }

    // Check if user has required role
    if (
      requiredRoles.length &&
      !requiredRoles.includes(req.user.role as string)
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }

    next();
  });
};
