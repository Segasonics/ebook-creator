import { Router } from "express";
import {
  generateChapterContent,
  generateOutline,
} from "../controllers/aiController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router: Router = Router();

router.use(authMiddleware);

router.post("/generate-outline", generateOutline);
router.post("/generate-chapter-content", generateChapterContent);
export default router;
