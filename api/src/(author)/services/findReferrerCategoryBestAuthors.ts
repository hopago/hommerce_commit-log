import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../middleware/error/utils";
import { FilterQuery } from "mongoose";
import Author from "../models/author";
import Book, { IBook } from "../../(book)/models/book";

type QueryType = string | undefined | "undefined";

export const findReferrerCategoryBestAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.query.category as QueryType;
    const bookId = req.query.bookId as QueryType;

    if (!category && !bookId)
      throw new HttpException(400, "At least one query required.");

    let foundBooks: IBook[] = [];

    if (bookId) {
      const book = await Book.findById(bookId);
      if (!book) throw new HttpException(404, "Book not found.");

      foundBooks = await Book.find({ category: book.category }).sort({
        views: -1,
      });
    } else if (category) {
      foundBooks = await Book.find({ category }).sort({ views: -1 });
    }

    if (foundBooks.length === 0)
      throw new HttpException(404, "Book not found.");

    const authorNames = foundBooks.map((book) => book.author).slice(0, 5);

    const authorsInfoPromises = authorNames.map((authorName) =>
      Author.findOne({ name: authorName })
    );
    const authorsInfo = (await Promise.all(authorsInfoPromises)).filter(
      (authorInfo) => authorInfo
    );

    return res.status(200).json(authorsInfo);
  } catch (err) {
    next(err);
  }
};
