export interface IOrder { 
  customerId: string; 
  mealId: string;
  deliveryAddress: string;
  phone: number; 
  mealItemIds: string[];
  status: 'pending' | 'in progress' | 'delivered' | 'cancelled'; 
  scheduledDate: string;
  specialInstructions: string[];
  pricing: number;
  providerId: string; 
  dietaryPreferences: string[];
  
}
