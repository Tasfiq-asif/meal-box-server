 import mongoose from 'mongoose';
import { IOrder } from './order.interface';
import { Order } from './order.model';


export class OrderService {
  // Create a new order
  static async createOrder(payload: IOrder): Promise<IOrder> {
    const order = new Order({
      ...payload,
      Status: payload.status || 'pending',
    });
    return await order.save();
  }

  // Get all orders placed by a specific customer
  static async getCustomersOrders(customerId: string): Promise<IOrder[]> {
    // if (!mongoose.Types.ObjectId.isValid(customerId)) {
    //   throw new Error('Invalid Customer ID');
    // }
    return await Order.find({ customerId: customerId }).sort({ createdAt: -1 });
  }

  // Get all orders handled by a specific provider
  static async getProvidersOrders(providerId: string): Promise<IOrder[]> {
    // if (!mongoose.Types.ObjectId.isValid(providerId)) {
    //   throw new Error('Invalid Provider ID');
    // }
    return await Order.find({ providerId: providerId }).sort({ createdAt: -1 });
  }
}
