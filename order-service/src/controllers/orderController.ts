import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: "client" | "user";
  };
}

const orderRepository = AppDataSource.getRepository(Order);

// Create Order
export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { customerName, items } = req.body;

    if (!customerName || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid order data." });
    }

    const order = new Order();
    order.customerName = customerName;
    order.userId = req.user!.id;

    order.items = items.map((item: any) => {
      const orderItem = new OrderItem();
      orderItem.productId = item.productId;
      orderItem.quantity = item.quantity;
      return orderItem;
    });

    const savedOrder = await orderRepository.save(order);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get All Orders for a User
export const getOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orders = await orderRepository.find({
      where: { userId: req.user!.id },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update Order
// Update Order
export const updateOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    const { customerName, items } = req.body;

    const order = await orderRepository.findOne({
      where: { id: orderId, userId: req.user!.id },
      relations: ["items"],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (customerName) order.customerName = customerName;

    if (items && Array.isArray(items)) {
      // Clear the existing items
      order.items = [];

      // Create new OrderItem instances
      items.forEach((item: any) => {
        const orderItem = new OrderItem();
        orderItem.productId = item.productId;
        orderItem.quantity = item.quantity;
        order.items.push(orderItem);
      });
    }

    const updatedOrder = await orderRepository.save(order);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete Order
export const deleteOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orderId = Number(req.params.id);

    const order = await orderRepository.findOneBy({
      id: orderId,
      userId: req.user!.id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    await orderRepository.remove(order);
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
