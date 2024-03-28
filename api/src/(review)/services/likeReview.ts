import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../middleware/error/utils";
import Review from "../models/review";

export const likeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.query.userId as string | undefined | "undefined";
    if (!reviewId) throw new HttpException(400, "Review Id required.");
    if (!userId || userId === "undefined")
      throw new HttpException(400, "User Id required.");

    const updatedReview = await Review.findById(reviewId);
    if (!updatedReview) throw new HttpException(404, "Review not found.");

    const findIndex = updatedReview.liked.findIndex(
      (id) => id.toLowerCase() === userId.toLowerCase()
    );

    if (findIndex !== -1) {
      updatedReview.liked.splice(findIndex, 1);
    } else {
      updatedReview.liked.push(userId);
    }

    await updatedReview.save();

    return res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};
