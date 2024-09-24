import express from "express";
import prodcutRoutes from "./routes/productRoutes";
import authMiddleware from "./middleware/authMiddleware";

const app = express();

app.use(express.json());

app.use(authMiddleware);

app.use("/api/products", prodcutRoutes);

export default app;
