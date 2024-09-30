import React from 'react';
import { Order } from '../../interfaces/Order';
import { deleteOrder, getOrders } from '../../services/orderService';
import Loader from '../../components/Loader';

interface OrderListProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    onEdit: (order: Order) => void;
    loading: boolean;
}

const OrderList = ({ orders, setOrders, onEdit, loading }: OrderListProps) => {
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id);
                const updatedOrders = await getOrders();
                setOrders(updatedOrders);
                alert('Order deleted successfully.');
            } catch (error: any) {
                console.error('Error deleting order:', error);
                alert(error.response?.data?.message || 'Error deleting order.');
            }
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (orders.length === 0) {
        return <p className="text-center mt-4">No orders found.</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Your Orders</h2>
            {orders.map((order) => (
                <div className="card mb-3" key={order.id}>
                    <div className="card-body">
                        <h5 className="card-title">Order #{order.id}</h5>
                        <p className="card-text"><strong>Customer:</strong> {order.customerName}</p>
                        <p className="card-text"><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
                        <p className="card-text"><strong>Shipping Cost:</strong> ${order.shippingCost ? order.shippingCost : 'Calculating...'}</p>
                        <p className="card-text"><strong>Shipping Status:</strong> {order.shippingStatus || 'Pending'}</p>
                        <h6>Items:</h6>
                        <ul className="list-group mb-3">
                            {order.items.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>Product ID:</strong> {item.productId}, <strong>Quantity:</strong> {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-primary me-2" onClick={() => onEdit(order)}>
                            Edit Order
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(order.id!)}>
                            Delete Order
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
