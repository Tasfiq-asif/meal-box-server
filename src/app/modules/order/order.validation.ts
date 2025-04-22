import { z } from "zod";

export const OrderSchema = z.object({
  customerId: z.string(),
  mealId: z.string(),
  deliveryAddress: z.string(),
  phone: z.number(),
  mealItemIds: z.array(z.string()),
  status: z.enum(["pending", "in progress", "delivered", "cancelled"]),
  scheduledDate: z.string(),
  specialInstructions: z.array(z.string()),
  pricing: z.number(),
  providerId: z.string(),
  dietaryPreferences: z.array(z.string()),
});

// Optional: infer the TypeScript type from Zod
export type IOrder = z.infer<typeof OrderSchema>;
