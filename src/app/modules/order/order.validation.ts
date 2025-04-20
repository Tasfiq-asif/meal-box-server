import { z } from "zod";

export const OrderSchema = z.object({
  CustomerId: z.string(),
  MenuId: z.string(),
  DeliveryAddress: z.string(),
  Phone: z.number(),
  MealItemIds: z.array(z.string()),
  Status: z.enum(["pending", "in progress", "delivered", "cancelled"]),
  Schedule: z.string(),
  CustomizationOptions: z.array(z.string()),
  Pricing: z.number(),
    ProviderId: z.string(),
  dietaryPreferences: z.array(z.string()),
  notes: z.string().optional(),
});

// Optional: infer the TypeScript type from Zod
export type IOrder = z.infer<typeof OrderSchema>;
