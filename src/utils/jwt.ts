import jwt from "jsonwebtoken";
import config from "../app/config";

// Define JWT payload structure
export interface JwtPayload {
  id: string;
  role?: string;
  iat?: number;
}

export const verifyToken = (token: string): JwtPayload => {
  const secret = String(config.jwt_secret);
  // @ts-ignore - Ignoring type errors for jwt.verify
  return jwt.verify(token, secret) as JwtPayload;
};

export const createToken = (payload: JwtPayload): string => {
  const secret = String(config.jwt_secret);
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
