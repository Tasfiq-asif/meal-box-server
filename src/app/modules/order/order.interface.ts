export interface IOrder { 
  CustomerId: string; 
  MenuId: string;
  DeliveryAddress: string;
  Phone: number; 
  MealItemIds: string[];
  Status: 'pending' | 'in progress' | 'delivered' | 'cancelled'; 
  Schedule: string;
  CustomizationOptions: string[];
  Pricing: number;
  ProviderId: string; 
  dietaryPreferences: string[];
  notes?: string; 
}
