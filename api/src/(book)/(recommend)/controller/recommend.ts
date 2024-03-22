import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../../middleware/error/utils";
import { handleFindRecommendBookByCategory } from "../services/findRecommendBooksByCategory";

export const getRecommendBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = req.query.category as
    | BookSubCategory
    | undefined
    | "undefined";

  if (!category || category === "undefined")
    throw new HttpException(400, "Book category required.");

  try {
    const recommendBooks = await handleFindRecommendBookByCategory(
      category,
      next
    );

    if (recommendBooks) {
      return res.status(200).json(recommendBooks);
    }
  } catch (err) {
    next(err);
  }
};
