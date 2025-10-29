import { Router } from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateUserProfile);

export default router;
