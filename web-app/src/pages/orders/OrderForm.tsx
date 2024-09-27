import React, { useState, useEffect } from 'react';
import { Order, OrderItem } from '../../interfaces/Order';
import { Product } from '../../interfaces/Product';
import { getProducts } from '../../services/productService';

interface OrderFormProps {
    onSubmit: (order: Order) => void;
    onCancel: () => void;
    editingOrder?: Order;
}

const OrderForm = ({ onSubmit, onCancel, editingOrder }: OrderFormProps) => {
    const [customerName, setCustomerName] = useState(editingOrder?.customerName || '');
    const [orderItems, setOrderItems] = useState<OrderItem[]>(editingOrder?.items || []);
    const [products, setProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts();
            setProducts(productList);
        };
        fetchProducts();
    }, []);

    const addItem = (productId: number) => {
        if (quantity > 0) {
            const existingItem = orderItems.find(item => item.productId === productId);
            if (existingItem) {
                setOrderItems(orderItems.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ));
            } else {
                setOrderItems([...orderItems, { productId, quantity }]);
            }
        }
    };

    const removeItem = (productId: number) => {
        setOrderItems(orderItems.filter(item => item.productId !== productId));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const order: Order = {
            customerName,
            items: orderItems,
        };
        onSubmit(order);
        setCustomerName('');
        setOrderItems([]);
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2>{editingOrder ? 'Edit Order' : 'Create Order'}</h2>
            <div className="mb-3">
                <label className="form-label">Customer Name:</label>
                <input
                    className="form-control"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
            </div>

            <div>
                <h3>Add Items</h3>
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4 mb-3" key={product.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: ${product.price}</p>
                                    <p className="card-text">No Image Available</p>
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control mb-2"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => addItem(Number(product.id))}
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4>Order Items:</h4>
                <ul className="list-group mb-3">
                    {orderItems.map((item, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            <span>
                                Product ID: {item.productId}, Quantity: {item.quantity}
                            </span>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removeItem(item.productId)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <button type="submit" className="btn btn-primary me-2">
                {editingOrder ? 'Update Order' : 'Create Order'}
            </button>
            <button type="button" className="btn btn-danger" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default OrderForm;
