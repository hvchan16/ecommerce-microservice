import React, { useState, useEffect } from 'react';
import { Order } from '../../interfaces/Order';
import { getOrders, createOrder, updateOrder } from '../../services/orderService';
import OrderList from './OrderList';
import OrderForm from './OrderForm';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null); // Stores the order being edited

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const fetchedOrders = await getOrders();
            setOrders(fetchedOrders);
        } catch (error: any) {
            console.error('Error fetching orders:', error);
            alert(error.response?.data?.message || 'Failed to fetch orders.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAdd = () => {
        setEditingOrder(null); // Clear any existing editing order
        setShowForm(true);
    };

    const handleEdit = (order: Order) => {
        setEditingOrder(order);
        setShowForm(true);
    };

    const handleFormSubmit = async (order: Order) => {
        try {
            if (editingOrder && editingOrder.id) {
                await updateOrder(editingOrder.id, order);
                alert('Order updated successfully.');
            } else {
                await createOrder(order);
                alert('Order created successfully.');
            }
            setShowForm(false);
            fetchOrders();
        } catch (error: any) {
            console.error('Error saving order:', error);
            alert(error.response?.data?.message || 'Failed to save order.');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="container mt-4">
            <h1>Manage Your Orders</h1>
            <button className="btn btn-success mb-3" onClick={handleAdd}>
                Create New Order
            </button>
            {showForm ? (
                <OrderForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                    editingOrder={editingOrder || undefined}
                />
            ) : (
                <OrderList
                    orders={orders}
                    setOrders={setOrders}
                    onEdit={handleEdit}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default OrdersPage;
