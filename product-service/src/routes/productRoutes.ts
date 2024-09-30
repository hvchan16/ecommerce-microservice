import { Router } from "express";
import { authenticateJWT } from "../middleware/authorizeJWT";
import { authorizeRoles } from "../middleware/authorizeRoles";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

// Create Product - 'client' role
router.post("/", authenticateJWT, authorizeRoles(["client"]), createProduct);

// Get Products - 'client' and 'user' roles
router.get(
  "/",
  authenticateJWT,
  authorizeRoles(["client", "user"]),
  getProducts
);

// Update Product - 'client' role
router.put("/:id", authenticateJWT, authorizeRoles(["client"]), updateProduct);

// Delete Product - 'client' role
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles(["client"]),
  deleteProduct
);

export default router;
