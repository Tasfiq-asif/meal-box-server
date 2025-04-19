import { Types } from "mongoose";
import { USER_ROLE } from "./user.constants";

export type UserRole = "customer" | "provider";

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  photo?: string;
  address?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword?(candidatePassword: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface TUserRegistration {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  address?: string;
}
