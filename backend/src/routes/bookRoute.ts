import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
  updateBookCover,
} from "../controllers/bookController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router: Router = Router();

router.use(authMiddleware);

router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/:id/cover").put(upload, updateBookCover);
export default router;
