import { NextFunction } from "express";
import Book, { IBook } from "../../models/book";
import Favor from "../../../(user)/(favor)/models/favor";
import { HttpException } from "../../../middleware/error/utils";

const LIMIT_SIZE = 5;

export const handleFindRecommendBookByCategory = async (
  category: BookSubCategory | undefined | "undefined",
  next: NextFunction
) => {
  try {
    if (!category || category === "undefined")
      throw new HttpException(400, "Book category required.");

    const recommendBooks = await Book.find({
      category,
    })
      .sort({ views: -1 })
      .limit(LIMIT_SIZE);
    if (!recommendBooks) throw new HttpException(404, "Book not found.");

    const favorCounts = await Favor.aggregate([
      { $unwind: "$books" },
      { $group: { _id: "$books.bookId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    if (Array.isArray(favorCounts) && favorCounts.length) {
      const sortedRecommendBooks: IBook[] = recommendBooks
        .map((book: any & { _doc: IBook }) => {
          const favorCount = favorCounts.find(
            (favor: IBook) =>
              favor._id.toString().toLowerCase() ===
              book._id.toString().toLowerCase()
          );

          return {
            ...book._doc,
            favorCount: favorCount ? favorCount.count : 0,
          };
        })
        .sort(
          (
            a: IBook & { favorCount: number },
            b: IBook & { favorCount: number }
          ) => b.favorCount - a.favorCount
        );

      return sortedRecommendBooks;
    } else {
      return recommendBooks;
    }
  } catch (err) {
    next(err);
  }
};
