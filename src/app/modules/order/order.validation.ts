import { z } from "zod";

// Zod regex for a valid MongoDB ObjectId (24 hex characters)
const objectIdRegex = /^[a-f\d]{24}$/i;

export const OrderSchema = z.object({
  customerId: z.string().regex(objectIdRegex, "Invalid Customer ObjectId"),
  mealId: z.string().regex(objectIdRegex, "Invalid mealId ObjectId"),
  deliveryAddress: z.string(),
  phone: z.number(),
  mealItemIds: z.array(z.string()),
  status: z.enum(["pending", "in progress", "delivered", "cancelled"]),
  scheduledDate: z.string(),
  specialInstructions: z.array(z.string()),
  pricing: z.number(),
  providerId: z.string().regex(objectIdRegex, "Invalid Provider ObjectId"),
  dietaryPreferences: z.array(z.string()),
});

// Optional: infer the TypeScript type from Zod
export type IOrder = z.infer<typeof OrderSchema>;
