import express from "express";
const router = express.Router();
import { createOrder, getMyOrders } from "../../controllers/orderController.js";
import { protect } from "../../middlewares/authMiddleware.js";

// All order routes should be protected
router.route("/").post(protect, createOrder).get(protect, getMyOrders);

export default router;
