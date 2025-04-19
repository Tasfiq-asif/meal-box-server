import { z } from "zod";

// Base schema without refinement
const registerSchema = z.object({
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
    confirmPassword: z.string(),
    role: z.enum(["customer", "provider"], {
      required_error: "Role must be either customer or provider",
    }),
    phone: z.string().optional(),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long" })
      .optional(),
  }),
});

// Custom validation function for password matching
const validateRegistration = (data: z.infer<typeof registerSchema>) => {
  if (data.body.password !== data.body.confirmPassword) {
    throw new z.ZodError([
      {
        code: "custom",
        message: "Passwords do not match",
        path: ["body", "confirmPassword"],
      },
    ]);
  }
  return data;
};

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

export const AuthValidation = {
  registerValidationSchema: registerSchema,
  loginValidationSchema,
};
