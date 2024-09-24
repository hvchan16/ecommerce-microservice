import { Product } from "./Product";

export interface OrderItem {
  productId: number;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: number;
  customerName: string;
  items: OrderItem[];
}
