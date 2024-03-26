import express from "express";
import {
  deleteBook,
  deleteImage,
  getBook,
  getBooks,
  getBooksByIds,
  postBook,
  updateBook,
  updateImage,
} from "../controllers/book";
import { getDocsLength } from "../services/getDocsLength";
import { getBestBooks } from "../controllers/bestBooks";

const router = express.Router();

router.route("/").get(getBooks).post(postBook);

router.route("/ids").get(getBooksByIds);

router.route("/best").get(getBestBooks);

router.route("/docs").get(getDocsLength);

router.route("/:bookId/i").patch(updateImage).delete(deleteImage);

router.route("/:bookId").get(getBook).patch(updateBook).delete(deleteBook);

export default router;
