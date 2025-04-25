import mongoose from "mongoose";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

export class OrderService {
  // Create a new order
  static async createOrder(payload: IOrder): Promise<IOrder> {
    const order = new Order({
      ...payload,
      Status: payload.status || "pending",
    });
    return await order.save();
  }

  // Update an order by ID
  static async updateOrder(
    orderId: string,
    updateData: Partial<IOrder>
  ): Promise<IOrder | null> {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid Order ID");
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder;
  }

  // Get a single order by ID
  static async getOrderById(orderId: string): Promise<IOrder | null> {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid Order ID");
    }
    const order = await Order.findById(orderId)
      .populate("customerId", "name email")
      .populate("mealId", "mealName description imageUrl");

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  // Get all orders placed by a specific customer
  static async getCustomersOrders(customerId: string): Promise<IOrder[]> {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      throw new Error("Invalid Customer ID");
    }
    return await Order.find({ customerId: customerId })
      .populate("customerId", "name email")
      .populate("mealId", "mealName description imageUrl")
      .sort({ createdAt: -1 });
  }

  // Get all orders handled by a specific provider
  static async getProvidersOrders(providerId: string): Promise<IOrder[]> {
    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      throw new Error("Invalid Provider ID");
    }
    return await Order.find({ providerId: providerId })
      .populate("customerId", "name email")
      .populate("mealId", "mealName description imageUrl")
      .sort({ createdAt: -1 });
  }
}
