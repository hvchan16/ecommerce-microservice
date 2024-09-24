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
        <form onSubmit={handleSubmit}>
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <label>
                Name:
                <input name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Price:
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <button type="submit">{product ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default ProductForm;
