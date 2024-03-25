import { NextFunction, Request } from "express";
import { isFieldsFullFilled } from "../../../utils/isFieldsFullFilled";
import ReviewReply from "../models/review-reply";
import Review from "../../models/review";
import { HttpException } from "../../../middleware/error/utils";

export const handlePostReply = async (req: Request, next: NextFunction) => {
  const fields = ["username", "desc"];

  isFieldsFullFilled(fields, req);

  try {
    const isExist = await Review.findById(req.params.reviewId);
    if (!isExist) throw new HttpException(404, "Review not found.");

    const newReply = new ReviewReply({
      ...req.body,
      userId: req.query.userId,
      reviewId: req.params.reviewId,
    });

    try {
      const savedReply = await newReply.save();

      return savedReply;
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
