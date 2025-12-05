import { Router } from "express";
import productController from "../../controllers/productController.js";
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", protect, isAdmin, productController.createProduct);

export default router;
