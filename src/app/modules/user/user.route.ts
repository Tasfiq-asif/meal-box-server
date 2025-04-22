import express from "express";
import { UserController } from "./user.controller";
import { validate } from "../../../middleware/validate.middleware";
import { UserValidation } from "./user.validation";
import auth from "../../../middleware/auth.middleware";

const router = express.Router();

// Public routes
router.post(
  "/register",
  validate(UserValidation.userValidationSchema),
  UserController.register
);
router.post(
  "/login",
  validate(UserValidation.loginValidationSchema),
  UserController.login
);
router.get("/logout", UserController.logout);

// Protected routes - using standard auth middleware
router.get("/profile", auth(), UserController.getProfile);
router.put(
  "/profile",
  auth(),
  validate(UserValidation.updateProfileValidationSchema),
  UserController.updateProfile
);
router.post(
  "/change-password",
  auth(),
  validate(UserValidation.passwordChangeValidationSchema),
  UserController.changePassword
);
router.delete("/:id", auth(), UserController.deleteUser);

export const userRouter = router;
