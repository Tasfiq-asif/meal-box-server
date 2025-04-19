import express from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../../middleware/validate.middleware";
import { protect } from "../../../middleware/auth.middleware";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

// Public routes
router.post(
  "/register",
  validate(AuthValidation.registerValidationSchema),
  AuthController.register
);
router.post(
  "/login",
  validate(AuthValidation.loginValidationSchema),
  AuthController.login
);
router.get("/logout", AuthController.logout);

// Protected routes
router.use(protect);
router.get("/me", AuthController.getMe);

export const authRouter = router;
