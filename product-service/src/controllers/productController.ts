import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: "client" | "user";
  };
}

const productRepository = AppDataSource.getRepository(Product);

// Create Product
export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    const existingProduct = await productRepository.findOneBy({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists." });
    }

    const product = productRepository.create({
      name,
      price,
      description,
    });

    const savedProduct = await productRepository.save(product);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get All Products
export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const products = await productRepository.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update Product
export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const productId = Number(req.params.id);
    const { name, price, description } = req.body;

    const product = await productRepository.findOneBy({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;

    const updatedProduct = await productRepository.save(product);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete Product
export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const productId = Number(req.params.id);

    const product = await productRepository.findOneBy({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await productRepository.remove(product);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
