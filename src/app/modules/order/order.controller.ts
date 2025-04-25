import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { OrderSchema } from "./order.validation";

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      // const payload = OrderSchema.parse(req.body);

      const order = await OrderService.createOrder(req.body);
      return res.status(201).json({
        message: " Order created successfully",
        success: true,
        data: order,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
        error: error.message,
      });
    }
  }

  static async updateOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const updateData = req.body;

    try {
      const updatedOrder = await OrderService.updateOrder(orderId, updateData);
      return res.status(200).json({
        message: "Order updated successfully",
        success: true,
        data: updatedOrder,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  }

  static async getCustomerOrders(req: Request, res: Response) {
    const { customerId } = req.params;

    try {
      const orders = await OrderService.getCustomersOrders(customerId);
      return res.status(200).json({
        message: "Orders retrieved successfully",
        success: true,
        data: orders,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
        error: error.message,
      });
    }
  }

  static async getProviderOrders(req: Request, res: Response) {
    const { providerId } = req.params;

    try {
      const orders = await OrderService.getProvidersOrders(providerId);
      return res.status(200).json({
        message: "Orders retrieved successfully",
        success: true,
        data: orders,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
        error: error.message,
      });
    }
  }
}
