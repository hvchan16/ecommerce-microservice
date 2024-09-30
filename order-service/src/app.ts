import express from "express";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/orders", orderRoutes);

export default app;
