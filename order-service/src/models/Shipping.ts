export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface ShippingRequest {
  items: OrderItem[];
  deliveryLocation: string;
}

export interface ShippingResponse {
  cost: number;
  status: string;
}
