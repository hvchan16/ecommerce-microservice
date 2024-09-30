import { Router } from "express";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { authenticateJWT } from "../middleware/authorizeJWT";

import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

const router = Router();

// Create Order - 'user' role
router.post("/", authenticateJWT, authorizeRoles(["user"]), createOrder);

// Get Orders - 'user' role
router.get("/", authenticateJWT, authorizeRoles(["user"]), getOrders);

// Update Order - 'user' role
router.put("/:id", authenticateJWT, authorizeRoles(["user"]), updateOrder);

// Delete Order - 'user' role
router.delete("/:id", authenticateJWT, authorizeRoles(["user"]), deleteOrder);

export default router;
