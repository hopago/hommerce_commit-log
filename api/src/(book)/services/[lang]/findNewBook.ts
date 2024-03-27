import { NextFunction, Request } from "express";
import { HttpException } from "../../../middleware/error/utils";
import Book from "../../models/book";

export const findNewBook = async (req: Request, next: NextFunction) => {
  const langCategory = req.query.lang as
    | BookParentCategory
    | undefined
    | "undefined";
  const targetCategory = req.query.category as
    | BookSubCategory
    | undefined
    | "undefined";

  if (
    !langCategory ||
    langCategory === "undefined" ||
    !targetCategory ||
    targetCategory === "undefined"
  ) {
    throw new HttpException(400, "Book category not found.");
  }

  try {
    const query: any = {};
    query.parentCategory = langCategory;
    if (targetCategory) {
      query.category = targetCategory;
    }

    const latestBooks = await Book.find(query).sort({ createdAt: -1 }).limit(6);

    return latestBooks;
  } catch (err) {
    next(err);
  }
};
