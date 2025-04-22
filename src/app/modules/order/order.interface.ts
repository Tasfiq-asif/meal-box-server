import mongoose from "mongoose";

export interface IOrder { 
  customerId: mongoose.Types.ObjectId;
  mealId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  deliveryAddress: string;
  phone: number; 
  mealItemIds: string[];
  status: 'pending' | 'in progress' | 'delivered' | 'cancelled'; 
  scheduledDate: string;
  specialInstructions: string[];
  pricing: number;
  dietaryPreferences: string[];
  
}
