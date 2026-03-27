import { Router } from "express";
import {
  getPublishedBookById,
  getPublishedBooks,
  ratePublishedBook,
} from "../controllers/bookController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router: Router = Router();

router.route("/books").get(getPublishedBooks);
router.route("/books/:id").get(getPublishedBookById);
router.route("/books/:id/rate").post(authMiddleware, ratePublishedBook);

export default router;
