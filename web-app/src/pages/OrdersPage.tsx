import React, { useState, useEffect } from 'react';
import { Order } from '../interfaces/Order';
import { getOrders, createOrder } from '../services/orderService';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';
import Loader from '../components/Loader';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    const fetchOrders = async () => {
        setLoading(true);
        const orderList = await getOrders();
        setOrders(orderList);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAdd = () => {
        setShowForm(true);
    };

    const handleFormSubmit = async (order: Order) => {
        await createOrder(order);
        setShowForm(false);
        fetchOrders();
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <button onClick={handleAdd}>Create Order</button>
                    {showForm ? (
                        <OrderForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
                    ) : (
                        <OrderList orders={orders} />
                    )}
                </>
            )}
        </div>
    );
};

export default OrdersPage;
