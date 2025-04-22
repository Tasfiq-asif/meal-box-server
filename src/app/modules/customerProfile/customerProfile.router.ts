import express from "express";
import { ProfileController } from "./customerProfile.controller";

const router = express.Router();

// Create customer profile
router.post("/customer", ProfileController.profile);

// Get customer profile by customer ID
router.get("/customer/:customerId", ProfileController.getcustomerprofile);

// Get customer profile by user ID
router.get("/user/:userId", ProfileController.getProfileByUserId);

// Get all customer profiles
router.get("/customers", ProfileController.getAllCustomerProfiles);

export const CustomerProfileRouter = router;
