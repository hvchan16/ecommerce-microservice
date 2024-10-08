import express from "express";
import prodcutRoutes from "./routes/productRoutes";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/products", prodcutRoutes);

export default app;
