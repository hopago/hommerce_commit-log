import { NextFunction, Request } from "express";
import ReviewReply from "../models/review-reply";
import { validateFields } from "../../../utils/validateFields";
import { HttpException } from "../../../middleware/error/utils";

export const handleUpdateReply = async (req: Request, next: NextFunction) => {
  const validFields = ["desc"];

  validateFields(validFields, req);

  try {
    const updatedReply = await ReviewReply.findOneAndUpdate(
      {
        userId: req.query.userId,
        reviewId: req.params.reviewId,
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedReply) throw new HttpException(404, "Reply not found.");

    return updatedReply;
  } catch (err) {
    next(err);
  }
};
