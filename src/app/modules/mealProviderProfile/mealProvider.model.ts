import mongoose, { Schema, Document } from "mongoose";
import { TUser } from "../user/user.interface";

export interface IMealProvider extends Document {
  userId: mongoose.Types.ObjectId | TUser;
  cuisineSpecialties: string[];
  pricing: number;
  experience: string;
  availability: boolean;
}

const mealProviderSchema = new Schema<IMealProvider>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    cuisineSpecialties: { type: [String], required: true },
    pricing: { type: Number, required: true },
    experience: { type: String, required: true },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MealProvider = mongoose.model<IMealProvider>(
  "MealProvider",
  mealProviderSchema
);
