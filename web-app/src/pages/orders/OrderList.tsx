import { Order } from '../../interfaces/Order';
import { deleteOrder, getOrders } from '../../services/orderService';

interface OrderListProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    onEdit: (order: Order) => void; // Pass the order to be edited
}

const OrderList = ({ orders, setOrders, onEdit }: OrderListProps) => {
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

    return (
        <div className="container mt-4">
            {orders.map((order) => (
                <div className="card mb-3" key={order.id}>
                    <div className="card-body">
                        <h3 className="card-title">Order #{order.id}</h3>
                        <p className="card-text">Customer: {order.customerName}</p>
                        <ul className="list-group mb-3">
                            {order.items.map((item, index) => (
                                <li className="list-group-item" key={index}>
                                    Product ID: {item.productId}, Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="btn btn-danger me-2"
                            onClick={() => handleDelete(Number(order.id))}
                        >
                            Delete Order
                        </button>
                        <button className="btn btn-primary" onClick={() => onEdit(order)}>
                            Edit Order
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
