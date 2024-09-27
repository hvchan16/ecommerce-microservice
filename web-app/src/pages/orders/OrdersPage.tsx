import { useState, useEffect } from 'react';
import { Order } from '../../interfaces/Order';
import { getOrders, createOrder, updateOrder } from '../../services/orderService';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import Loader from '../../components/Loader';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null); // Store the order being edited

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const orderList = await getOrders();
            setOrders(orderList);
        } catch (error: any) {
            console.error('Error fetching orders:', error);
            alert(error.response?.data?.message || 'Error fetching orders.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAdd = () => {
        setEditingOrder(null); // Clear the editing order when adding a new order
        setShowForm(true);
    };

    const handleEdit = (order: Order) => {
        setEditingOrder(order); // Load the selected order into the form
        setShowForm(true);
    };

    const handleFormSubmit = async (order: Order) => {
        try {
            if (editingOrder) {
                await updateOrder(editingOrder.id!, order); // Update existing order
            } else {
                await createOrder(order); // Create new order
            }
            alert('Order saved successfully.');
            setShowForm(false);
            fetchOrders();
        } catch (error: any) {
            console.error('Error saving order:', error);
            alert(error.response?.data?.message || 'Error saving order.');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="container mt-4">
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <button className="btn btn-primary mb-3" onClick={handleAdd}>
                        Create Order
                    </button>
                    {showForm ? (
                        <OrderForm
                            onSubmit={handleFormSubmit}
                            onCancel={handleCancel}
                            editingOrder={editingOrder || undefined} // Pass the order to be edited
                        />
                    ) : (
                        <OrderList orders={orders} setOrders={setOrders} onEdit={handleEdit} />
                    )}
                </>
            )}
        </div>
    );
};

export default OrdersPage;
