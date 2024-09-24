import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../models/Order";

const orderRepository = AppDataSource.getRepository(Order);

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderRepository.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error getting orders", error: error });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ["items"],
    });
    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting order", error: error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    // To validate the order, before checking the product exits or not
    const order = orderRepository.create(req.body);
    const ressult = await orderRepository.save(order);
    res.status(201).json(ressult);
  } catch (error) {
    res.status(400).json({ message: "Error adding order", error: error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    let order = await orderRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ["items"],
    });
    if (order) {
      orderRepository.merge(order, req.body);
      const result = await orderRepository.save(order);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (order) {
      await orderRepository.remove(order);
      res.status(200).json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error });
  }
};

// To create external apis for live tracking of shipping
