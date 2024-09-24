import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  getOrderById,
  updateOrder,
} from "../controllers/orderController";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

// To add shipping apis routers
export default router;
