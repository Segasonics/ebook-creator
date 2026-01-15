import { Router } from "express";
import { chatBox } from "../controllers/chatboxController.js";

const router: Router = Router();

router.post("/ai", chatBox);

export default router;
