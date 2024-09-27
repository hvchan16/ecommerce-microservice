import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces/Product';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../../services/productService';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import Loader from '../../components/Loader';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    const fetchProducts = async () => {
        setLoading(true);
        const productList = await getProducts();
        setProducts(productList);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAdd = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const handleFormSubmit = async (product: Product) => {
        if (editingProduct) {
            await updateProduct(editingProduct.id!, product);
        } else {
            await createProduct(product);
        }
        setShowForm(false);
        fetchProducts();
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Products</h1>
                <button className="btn btn-primary" onClick={handleAdd}>
                    Add Product
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <>
                    {showForm ? (
                        <ProductForm
                            product={editingProduct || undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <ProductList
                            products={products}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsPage;
