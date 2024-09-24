import React from 'react';
import { Product } from '../interfaces/Product';

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price ($)</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price.toFixed(2)}</td>
                        <td>{product.description}</td>
                        <td>
                            <button onClick={() => onEdit(product)}>Edit</button>
                            <button onClick={() => product.id && onDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
