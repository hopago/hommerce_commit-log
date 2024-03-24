import { NextFunction, Request } from "express";
import { isFieldsFullFilled } from "../../utils/isFieldsFullFilled";
import Review from "../models/review";
import { handlePostTotal } from "../(total)/services/postTotal";

export const handlePostReview = async (req: Request, next: NextFunction) => {
  const fields = [
    "bookTitle",
    "username",
    "rating",
    "keyword",
    "desc",
  ];

  isFieldsFullFilled(fields, req);

  try {
    const newReview = new Review({
      ...req.body,
      bookId: req.params.bookId,
      userId: req.params.userId,
    });

    try {
      await handlePostTotal(req, next);

      const savedReview = await newReview.save();

      return savedReview;
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
