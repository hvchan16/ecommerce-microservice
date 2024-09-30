import express from "express";
import cors from "cors";
import { calculateShipping } from "./controllers/shippingController";

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/shipping/calculate", calculateShipping);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("Mock Shipping API is running.");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Mock Shipping API is running on port ${PORT}`);
});
