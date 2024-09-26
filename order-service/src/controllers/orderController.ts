import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../models/Order";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { User } from "../models/Users";
import { OrderItem } from "../models/OrderItem";

const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);

interface CreateOrderBody {
  customerName: string;
  items: { productId: number; quantity: number }[];
}

export const getOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const orders = await orderRepository.find({
      where: { user: { id: userId } },
      relations: ["items"],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Error getting orders", error });
  }
};

export const getOrderById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const orderId = Number(req.params.id);

    const order = await orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ["items"],
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found or not authorized" });
    }
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ message: "Error getting order", error });
  }
};

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await userRepository.findOneBy({ id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderData = req.body as CreateOrderBody;

    if (
      !orderData.customerName ||
      !Array.isArray(orderData.items) ||
      orderData.items.length === 0
    ) {
      return res.status(400).json({ message: "Invalid order data." });
    }

    // Manually create Order and OrderItem instances
    const order = new Order();
    order.customerName = orderData.customerName;
    order.user = user;
    order.items = [];

    for (const itemData of orderData.items) {
      const orderItem = new OrderItem();
      orderItem.productId = itemData.productId;
      orderItem.quantity = itemData.quantity;
      orderItem.order = order;
      order.items.push(orderItem);
    }

    const savedOrder = await orderRepository.save(order);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ message: "Error adding order", error });
  }
};

export const updateOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const orderId = Number(req.params.id);
    const { customerName, items } = req.body as CreateOrderBody;

    // Fetch the order ensuring ownership
    const order = await orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ["items"],
    });

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or not authorized" });
    }

    // Update order properties
    if (customerName) {
      order.customerName = customerName;
    }

    if (Array.isArray(items) && items.length > 0) {
      // Remove existing items
      order.items = [];

      // Add updated items
      for (const itemData of items) {
        const orderItem = new OrderItem();
        orderItem.productId = itemData.productId;
        orderItem.quantity = itemData.quantity;
        orderItem.order = order;
        order.items.push(orderItem);
      }
    }

    // Save the updated order
    const updatedOrder = await orderRepository.save(order);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order", error });
  }
};

export const deleteOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const orderId = Number(req.params.id);

    const order = await orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ["items"],
    });

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or not authorized" });
    }

    await orderRepository.remove(order);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Error deleting order", error });
  }
};

// To create external apis for live tracking of shipping
