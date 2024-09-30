import orderApi from "./orderApi";
import { Order } from "../interfaces/Order";

export const getOrders = async (): Promise<Order[]> => {
  const response = await orderApi.get("/orders");
  return response.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await orderApi.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (order: Order): Promise<Order> => {
  console.log(order);
  const response = await orderApi.post("/orders", order);
  return response.data;
};

export const updateOrder = async (id: number, order: Order): Promise<Order> => {
  const response = await orderApi.put(`/orders/${id}`, order);
  return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await orderApi.delete(`/orders/${id}`);
};
