import { NextFunction, Request, Response } from "express";
import ReviewTotal from "../../(review)/(total)/models/review-total";
import Book, { IBook } from "../models/book";

type BookDetails = IBook;

interface AggregatedData {
  _id: string; // aggregationId
  averageRating: number;
  keywordCount: number;
  bookDetails: BookDetails;
}

interface AggregationResult {
  data: AggregatedData[];
  totalCount: { count: number }[];
}

type AggregateResponseType = AggregationResult[];

export const findMonthlyPicks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pageNum = parseInt(req.query.pageNum as string) || 0;
  const limit = parseInt(req.query.limit as string) || 1;
  const skip = Math.max(0, (pageNum - 1) * limit);

  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const adjustedLimit = pageNum === 0 ? 5 : limit + 1;

    const aggregation: AggregateResponseType = await ReviewTotal.aggregate([
      { $match: { createdAt: { $gte: oneMonthAgo } } },
      {
        $facet: {
          data: [
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
            { $unwind: "$bookDetails" },
            { $match: { "bookDetails.createdAt": { $gte: oneMonthAgo } } },
            { $sort: { "bookDetails.views": -1 } },
            { $skip: skip },
            { $limit: adjustedLimit },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const bestBooks = aggregation[0].data;
    const totalCount = aggregation[0].totalCount[0]
      ? aggregation[0].totalCount[0].count
      : 0;

    const hasNextPage = bestBooks.length > limit;
    if (hasNextPage) bestBooks.pop();

    // temporary
    if (bestBooks.length === 0) {
      const books = await Book.find({
        createdAt: { $gte: oneMonthAgo },
      })
        .sort({ views: -1 })
        .skip(skip)
        .limit(adjustedLimit);

      const bestBooks = books.map((book: IBook) => ({
        _id: book._id,
        bookDetails: book,
      }));

      const totalCount = await Book.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      const hasNextPage = bestBooks.length > limit;
      if (hasNextPage) bestBooks.pop();

      return { bestBooks, hasNextPage, totalCount };
    }

    return { bestBooks, hasNextPage, totalCount };
  } catch (err) {
    next(err);
  }
};
