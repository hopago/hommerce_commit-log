import { NextFunction } from "express";
import Review from "../models/review";
import { HttpException } from "../../middleware/error/utils";

type HandleGetUserReviewByBookId = {
  bookId: string;
  userId: string;
};

export const handleGetUserReviewByBookId = async (
  { bookId, userId }: HandleGetUserReviewByBookId,
  next: NextFunction
) => {
  try {
    const userReview = await Review.findOne({
      bookId,
      userId,
    });
    if (!userReview) throw new HttpException(404, "Review not found.");

    return userReview;
  } catch (err) {
    next(err);
  }
};
