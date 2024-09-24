import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";

const productRepository = AppDataSource.getRepository(Product);

// To add validtors to validate the schema befor exexuting the query

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = productRepository.create(req.body);
    const result = await productRepository.save(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error: error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const prodcuts = await productRepository.find();
    res.status(200).json(prodcuts);
  } catch (error) {
    res.status(500).json({ message: "Error getting product", error: error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting product", error: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (product) {
      productRepository.merge(product, req.body);
      const result = await productRepository.save(product);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (product) {
      await productRepository.remove(product);
      res.status(200).json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error });
  }
};
