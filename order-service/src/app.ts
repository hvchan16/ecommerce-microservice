import express from "express";
import orderRoutes from "./routes/orderRoutes";
import authMiddleware from "./middleware/authMiddleware";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(authMiddleware);

app.use("/api/orders", orderRoutes);

export default app;
