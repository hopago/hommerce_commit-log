import express from "express";
import {
  deleteReview,
  deleteReviewById,
  getDocsLength,
  getReviewByUserId,
  getReviews,
  getUserReviewByBookId,
  postReview,
  updateReview,
} from "../controllers/review";
import { likeReview } from "../services/likeReview";

const router = express.Router();

router
  .route("/user/:userId/book/:bookId")
  .get(getUserReviewByBookId)
  .post(postReview)
  .patch(updateReview)
  .delete(deleteReview);

router.route("/book/docs").get(getDocsLength);

router.route("/user/:userId").get(getReviewByUserId);

router.route("/book/:bookId").get(getReviews);

router.route("/").delete(deleteReviewById);

router.route("/:reviewId").patch(likeReview);

// router.route("/:reviewId/likes").patch(likeReview);

export default router;
