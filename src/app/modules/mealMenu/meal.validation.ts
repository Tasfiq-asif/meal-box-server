// src/app/modules/mealMenu/meal.validation.ts
import { z } from "zod";

const createMealValidationSchema = z.object({
  body: z.object({
    mealName: z
      .string({
        required_error: "Meal name is required",
      })
      .min(3, { message: "Meal name must be at least 3 characters" }),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(10, { message: "Description must be at least 10 characters" }),
    ingredients: z
      .array(
        z.string({
          required_error: "Ingredients must be strings",
        })
      )
      .min(1, { message: "At least one ingredient is required" }),
    portions: z
      .array(
        z.object({
          size: z.enum(["small", "medium", "large"], {
            required_error: "Size must be small, medium, or large",
          }),
          price: z
            .number({
              required_error: "Price is required",
            })
            .positive("Price must be positive"),
        })
      )
      .min(1, { message: "At least one portion size is required" })
      .refine(
        (portions) => {
          // Check for duplicate sizes
          const sizes = portions.map((p) => p.size);
          return sizes.length === new Set(sizes).size;
        },
        {
          message: "Duplicate portion sizes are not allowed",
        }
      ),
    dietTags: z.array(
      z.string({
        required_error: "Diet tags must be strings",
      })
    ),
    availability: z.boolean().default(true),
  }),
});

const updateMealValidationSchema = z.object({
  body: z
    .object({
      mealName: z.string().min(3).optional(),
      description: z.string().min(10).optional(),
      ingredients: z.array(z.string()).min(1).optional(),
      portions: z
        .array(
          z.object({
            size: z.enum(["small", "medium", "large"]),
            price: z.number().positive(),
          })
        )
        .min(1)
        .refine(
          (portions) => {
            const sizes = portions.map((p) => p.size);
            return sizes.length === new Set(sizes).size;
          },
          { message: "Duplicate portion sizes are not allowed" }
        )
        .optional(),
      dietTags: z.array(z.string()).optional(),
      availability: z.boolean().optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field is required for update",
    }),
});

export const MealValidation = {
  createMealValidationSchema,
  updateMealValidationSchema,
};
