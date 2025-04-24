import mongoose from "mongoose";

export interface IOrder { 
  customerId: mongoose.Types.ObjectId;
  mealId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  deliveryAddress: string;
  phone: number; 
  mealItemIds: string[];
  status: 'pending' | 'in progress' | 'delivered' | 'cancelled'; 
  scheduledDate: {
    startDate: string;
    endDate: string;
  };
  extraItems: string[];
  pricing: number;
  dietaryPreferences: string[];
}
