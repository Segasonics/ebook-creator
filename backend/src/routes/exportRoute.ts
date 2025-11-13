import { Router } from "express";
import { exportAsDocument, exportAsPdf } from "../controllers/exportController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get("/:id/pdf", authMiddleware, exportAsPdf);
router.get("/:id/doc", authMiddleware, exportAsDocument);
export default router;
