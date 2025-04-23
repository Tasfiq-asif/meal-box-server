import mongoose, { Schema, Document } from "mongoose";

export interface IMealMenu extends Document {
  userId: mongoose.Types.ObjectId;
  mealName: string;
  description: string;
  ingredients: string[];
  portions: {
    size: "small" | "medium" | "large";
    price: number;
  }[];
  dietTags: string[];
  availability: boolean;
}

const mealMenuSchema = new Schema<IMealMenu>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mealName: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  portions: {
    type: [
      {
        size: {
          type: String,
          enum: ["small", "medium", "large"],
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (portions: any[]) {
        return portions.length > 0;
      },
      message: "At least one portion size must be provided",
    },
  },
  dietTags: { type: [String], required: true },
  availability: { type: Boolean, default: true },
});

export const MealMenu = mongoose.model<IMealMenu>("MealMenu", mealMenuSchema);
