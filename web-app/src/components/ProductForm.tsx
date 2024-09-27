import React, { useState, useEffect } from 'react';
import { Product } from '../interfaces/Product';

interface ProductFormProps {
    product?: Product;
    onSubmit: (product: Product) => void;
    onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
    const [formData, setFormData] = useState<Product>(
        product || { name: '', price: 0, description: '' }
    );

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', price: 0, description: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2 className="mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>

            <div className="form-group mb-3">
                <label htmlFor="productName">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="productPrice">Price:</label>
                <input
                    type="number"
                    className="form-control"
                    id="productPrice"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="productDescription">Description:</label>
                <textarea
                    className="form-control"
                    id="productDescription"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="d-flex">
                <button type="submit" className="btn btn-primary me-2">
                    {product ? 'Update' : 'Add'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
