import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required and must be string",
      })
      .min(3)
      .max(100),
    email: z
      .string({
        required_error: "Email is required and must be string",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required and must be string",
      })
      .min(8, { message: "Password must be minimum of 8 characters" })
      .max(100, { message: "Password can not be more than 100 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    role: z.enum(["customer", "provider"], {
      required_error: "Role must be either customer or provider",
    }),
    phone: z.string().optional(),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long" })
      .optional(),
    photo: z.string().optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Please provide a valid email address"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const passwordChangeValidationSchema = z.object({
  body: z.object({
    currentPassword: z
      .string({ required_error: "Current password is required" })
      .min(8, { message: "Current password must be at least 8 characters" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, { message: "New password must be at least 8 characters" })
      .max(100, { message: "New password cannot be more than 100 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    phone: z.string().optional(),
    address: z.string().min(5).optional(),
    photo: z.string().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  loginValidationSchema,
  passwordChangeValidationSchema,
  updateProfileValidationSchema,
};
