import { Router } from "express";
import { OrderController } from "./order.controller";
import auth from "../../../middleware/auth.middleware";

const router = Router();

// Route to create a new order - only customers can create orders
router.post("/customers/order", auth("customer"), OrderController.createOrder);

router.patch("/orders/:orderId", OrderController.updateOrder);

// Route to get orders for a specific customer - only accessible by customers or the specific customer
router.get(
  "/customers/orders/:customerId",
  auth("customer"),
  OrderController.getCustomerOrders
);

// Route to get orders for a specific provider - only accessible by providers or the specific provider
router.get(
  "/providers/orders/:providerId",
  auth("provider"),
  OrderController.getProviderOrders
);

export const orderRouter = router;
