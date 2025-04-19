import jwt from "jsonwebtoken";
import config from "../app/config";

// Define JWT payload structure
export interface JwtPayload {
  id: string;
  iat?: number;
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 */
export const verifyToken = (token: string): JwtPayload => {
  const secret = String(config.jwt_secret);
  // @ts-ignore - Ignoring type errors for jwt.verify
  return jwt.verify(token, secret) as JwtPayload;
};
