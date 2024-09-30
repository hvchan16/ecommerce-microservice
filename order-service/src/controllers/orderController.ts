import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { getShippingCost } from "../services/shippingService";
import { ShippingRequest } from "../models/Shipping";

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
    const { customerName, items, deliveryLocation } = req.body;

    if (!customerName || !items || !Array.isArray(items) || !deliveryLocation) {
      return res.status(400).json({ message: "Invalid order data." });
    }

    const order = new Order();
    order.customerName = customerName;
    order.userId = req.user!.id;
    order.deliveryLocation = deliveryLocation;

    order.items = items.map((item: any) => {
      const orderItem = new OrderItem();
      orderItem.productId = item.productId;
      orderItem.quantity = item.quantity;
      return orderItem;
    });

    // Prepare shipping request
    const shippingRequest: ShippingRequest = {
      items: order.items,
      deliveryLocation: order.deliveryLocation,
    };

    // Fetch shipping cost from Shipping API
    try {
      const shippingData = await getShippingCost(shippingRequest);
      order.shippingCost = shippingData.cost;
      order.shippingStatus = shippingData.status;
    } catch (shippingError) {
      // Handle shipping API failure
      order.shippingCost = 0; // Default or fallback value
      order.shippingStatus = "Failed to calculate shipping cost.";
    }

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
      relations: ["items"],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update Order
export const updateOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    const { customerName, items, deliveryLocation } = req.body;

    const order = await orderRepository.findOne({
      where: { id: orderId, userId: req.user!.id },
      relations: ["items"],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (customerName) order.customerName = customerName;

    if (deliveryLocation) {
      order.deliveryLocation = deliveryLocation;

      // Prepare shipping request with updated location
      const shippingRequest: ShippingRequest = {
        items: items || order.items,
        deliveryLocation: order.deliveryLocation,
      };

      try {
        const shippingData = await getShippingCost(shippingRequest);
        order.shippingCost = shippingData.cost;
        order.shippingStatus = shippingData.status;
      } catch (shippingError) {
        // Handle shipping API failure
        order.shippingCost = 0; // Default or fallback value
        order.shippingStatus = "Failed to calculate shipping cost.";
      }
    }

    if (items && Array.isArray(items)) {
      // Update order items
      order.items = [];
      items.forEach((item: any) => {
        const orderItem = new OrderItem();
        orderItem.productId = item.productId;
        orderItem.quantity = item.quantity;
        order.items.push(orderItem);
      });

      // Recalculate shipping cost if items changed
      const shippingRequest: ShippingRequest = {
        items: order.items,
        deliveryLocation: order.deliveryLocation,
      };

      try {
        const shippingData = await getShippingCost(shippingRequest);
        order.shippingCost = shippingData.cost;
        order.shippingStatus = shippingData.status;
      } catch (shippingError) {
        // Handle shipping API failure
        order.shippingCost = 0; // Default or fallback value
        order.shippingStatus = "Failed to calculate shipping cost.";
      }
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
