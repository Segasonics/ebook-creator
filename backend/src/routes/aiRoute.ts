import { Router } from "express";
import {
  generateChapterContent,
  generateOutline,
} from "../controllers/aiController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.use(authMiddleware);

router.post("/generate-outline", generateOutline);
router.post("/generate-chapter-content", generateChapterContent);
export default router;
