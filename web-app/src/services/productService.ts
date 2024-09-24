import productApi from "./productApi";
import { Product } from "../interfaces/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await productApi.get("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await productApi.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await productApi.post("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Product
): Promise<Product> => {
  const response = await productApi.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await productApi.delete(`/products/${id}`);
};
