import mongoose, { Schema, Document, model } from 'mongoose';
import { IOrder } from './order.interface';


const OrderSchema: Schema = new Schema<IOrder>(
  {
    CustomerId: { type: String, required: true },
    // CustomerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    MenuId: { type: String, required: true },
    DeliveryAddress: { type: String, required: true },
    Phone: { type: Number, required: true },
    MealItemIds: [{ type: String, required: true }],
    Status: {
      type: String,
      enum: ['pending', 'in progress', 'delivered', 'cancelled'],
      default: 'pending',
    },
    Schedule: { type: String, required: true },
    CustomizationOptions: [{ type: String }],
    Pricing: { type: Number, required: true },
    ProviderId: { type: String, required: true },
    // ProviderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Provider' },
    dietaryPreferences: [{ type: String }],
    notes: { type: String },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', OrderSchema);