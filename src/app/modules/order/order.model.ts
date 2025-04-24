import mongoose, { Schema, Document, model } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema: Schema = new Schema<IOrder>(
  {
    // customerId: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    // mealId: { type: String, required: true },
    mealId: { type: Schema.Types.ObjectId, ref: 'MealMenu', required: true },
    deliveryAddress: { type: String, required: true },
    phone: { type: Number, required: true },
    mealItemIds: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["pending", "in progress", "delivered", "cancelled"],
      default: "pending",
    },
    scheduledDate: { type: String, required: true },
    specialInstructions: [{ type: String }],
    pricing: { type: Number, required: true },
    // providerId: { type: String, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    dietaryPreferences: [{ type: String }],
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", OrderSchema);
