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

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    // Ensure only clients can create products
    if (req.user?.role !== "client") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only clients can create products." });
    }

    // Check if product already exists
    const existingProduct = await productRepository.findOneBy({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists." });
    }

    // Create product associated with the client
    const product = productRepository.create({
      name,
      price,
      description,
      userId: req.user.id, // Associate with the client's userId
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
    let products;

    if (req.user?.role === "client") {
      // Clients see only their products
      products = await productRepository.findBy({ userId: req.user.id });
    } else if (req.user?.role === "user") {
      // Users see all products
      products = await productRepository.find();
    } else {
      return res.status(403).json({ message: "Forbidden: Invalid role." });
    }

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

    // Ensure only clients can update products
    if (req.user?.role !== "client") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only clients can update products." });
    }

    const product = await productRepository.findOneBy({
      id: productId,
      userId: req.user.id,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not owned by you." });
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

    // Ensure only clients can delete products
    if (req.user?.role !== "client") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only clients can delete products." });
    }

    const product = await productRepository.findOneBy({
      id: productId,
      userId: req.user.id,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not owned by you." });
    }

    await productRepository.remove(product);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
