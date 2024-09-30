export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  customerName: string;
  userId?: number;
  deliveryLocation: string;
  shippingCost?: number;
  shippingStatus?: string;
  items: OrderItem[];
}
