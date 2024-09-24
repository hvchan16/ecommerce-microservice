import React, { useState, useEffect } from 'react';
import { Order, OrderItem } from '../interfaces/Order';
import { Product } from '../interfaces/Product';
import { getProducts } from '../services/productService';

interface OrderFormProps {
    onSubmit: (order: Order) => void;
    onCancel: () => void;
}

const OrderForm = ({ onSubmit, onCancel }: OrderFormProps) => {
    const [customerName, setCustomerName] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productId, setProductId] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts();
            setProducts(productList);
            if (productList.length > 0) {
                setProductId(productList[0].id || 0);
            }
        };
        fetchProducts();
    }, []);

    const addItem = () => {
        if (productId && quantity > 0) {
            setOrderItems([...orderItems, { productId, quantity }]);
        }
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
        <form onSubmit={handleSubmit}>
            <h2>Create Order</h2>
            <label>
                Customer Name:
                <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            </label>
            <div>
                <h3>Add Items</h3>
                <label>
                    Product:
                    <select value={productId} onChange={(e) => setProductId(Number(e.target.value))}>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name} (ID: {product.id})
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </label>
                <button type="button" onClick={addItem}>Add Item</button>
            </div>
            <div>
                <h4>Order Items:</h4>
                <ul>
                    {orderItems.map((item, index) => (
                        <li key={index}>
                            Product ID: {item.productId}, Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit">Create Order</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default OrderForm;
