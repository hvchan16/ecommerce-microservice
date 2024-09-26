import express from "express";
import orderRoutes from "./routes/orderRoutes";
import authMiddleware from "./middleware/authMiddleware";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(authMiddleware);

app.use("/auth", authRoutes);
app.use("/api/orders", orderRoutes);

export default app;
