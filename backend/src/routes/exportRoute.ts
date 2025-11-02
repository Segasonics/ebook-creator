import { Router } from "express";
import { exportAsDocument, exportAsPdf } from "../controllers/exportController";

const router: Router = Router();

router.get("/:id/pdf", exportAsPdf);
router.get("/:id/doc", exportAsDocument);
export default router;
