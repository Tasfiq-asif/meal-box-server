import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

// Route to create a new order
router.post('/customers/order', OrderController.createOrder);

// Route to get orders for a specific customer
router.get('/customers/orders/:customerId', OrderController.getCustomerOrders);

// Route to get orders for a specific provider
router.get('/providers/orders/:providerId', OrderController.getProviderOrders);

export const orderRouter = router;