import { NextFunction, Request, Response } from "express";
import ReviewTotal from "../../(review)/(total)/models/review-total";
import Book, { IBook } from "../models/book";

interface BestBook {
  _id: string; // bestBook _id
  averageRating: number;
  keywordCount: number;
  bookDetails: IBook;
}

export const findBestSellers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bestBooks: BestBook[] = await ReviewTotal.aggregate([
      {
        $group: {
          _id: "$bookId",
          averageRating: { $avg: "$totalRating" },
          keywordCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $sort: { "bookDetails.views": -1 },
      },
      {
        $limit: 10,
      },
    ]);

    try {
      if (bestBooks.length < 10) {
        const booksByViews = await Book.find().sort({ views: -1 }).limit(10);
        return booksByViews;
      }

      return bestBooks;
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
