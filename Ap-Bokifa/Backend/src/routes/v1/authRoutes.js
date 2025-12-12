import { Router } from "express";
import userController from "../../controllers/userController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/sync", protect, userController.syncUserData);
router.get("/data", protect, userController.getUserData);

export default router;
