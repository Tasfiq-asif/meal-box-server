import { Types } from "mongoose";


export interface TCustomerProfile {
    userId?: Types.ObjectId;              
    deliveryAddress: string;
    phone: number;
    pastOrders: string[];          
    role: 'customer' | 'provider'; 
    email: string;
  }