import { Router } from "express";
import {
  exportAsDocument,
  exportAsPdf,
} from "../controllers/exportController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router: Router = Router();

router.get("/:id/pdf", authMiddleware, exportAsPdf);
router.get("/:id/doc", authMiddleware, exportAsDocument);
export default router;
