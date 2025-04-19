import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError, ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request against the schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      // If validation passes, proceed to the next middleware
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format ZodError for consistent error response
        const errorMessages = error.errors.map((err) => {
          // Join the path elements with a dot and remove the 'body.' prefix if it exists
          const field = err.path.join(".").replace(/^body\./, "");
          return {
            field,
            message: err.message,
          };
        });

        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: errorMessages,
        });
      }

      // Handle any other errors
      return next(error);
    }
  };
};
