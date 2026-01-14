import { Router } from "express";
import { chatBox } from "../controllers/chatboxController";

const router: Router = Router();

router.post("/ai", chatBox);

export default router;
