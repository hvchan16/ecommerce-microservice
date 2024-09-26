import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  getOrderById,
  updateOrder,
} from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, deleteOrder);

// To add shipping apis routers
export default router;
