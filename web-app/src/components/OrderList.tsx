import React from 'react';
import { Order } from '../interfaces/Order';

interface OrderListProps {
    orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
    return (
        <div>
            {orders.map((order) => (
                <div key={order.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                    <h3>Order #{order.id}</h3>
                    <p>Customer: {order.customerName}</p>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index}>
                                Product ID: {item.productId}, Quantity: {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
