import { NextFunction } from "express";
import Review from "../models/review";
import { HttpException } from "../../middleware/error/utils";

type HandleDeleteReviewByIdProps = {
  reviewId: string;
  userId: string;
};

export const handleDeleteReviewById = async (
  { reviewId, userId }: HandleDeleteReviewByIdProps,
  next: NextFunction
) => {
  try {
    const target = await Review.findById(reviewId);
    if (!target) throw new HttpException(404, "Review not found.");

    if (target.userId !== userId)
      throw new HttpException(403, "Not allowed way.");

    const isDeleted = await target.deleteOne();

    return isDeleted;
  } catch (err) {
    next(err);
  }
};
