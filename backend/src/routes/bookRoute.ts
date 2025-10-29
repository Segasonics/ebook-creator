import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
  updateBookCover,
} from "../controllers/bookController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router: Router = Router();

router.use(authMiddleware);

router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/:id/cover").put(upload, updateBookCover);
export default router;
