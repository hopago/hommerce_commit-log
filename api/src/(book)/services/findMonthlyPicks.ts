import { NextFunction, Request, Response } from "express";
import ReviewTotal from "../../(review)/(total)/models/review-total";
import Book, { IBook } from "../models/book";
import { PipelineStage } from "mongoose";

type BookDetails = IBook;

interface AggregatedData {
  _id: string;
  averageRating: number;
  keywordCount: number;
  bookDetails: BookDetails;
}

interface AggregationResult {
  data: AggregatedData[];
  totalCount: { count: number }[];
}

export const findMonthlyPicks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pageNum = parseInt(req.query.pageNum as string) || 1;
  const limit = parseInt(req.query.limit as string) || 6;
  const skip = Math.max(0, (pageNum - 1) * limit);
  const adjustedLimit = pageNum === 1 ? 6 : limit;

  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const aggregationPipeline: PipelineStage[] = [
      { $match: { createdAt: { $gte: oneMonthAgo } } },
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
      { $skip: (pageNum - 1) * limit },
      { $limit: adjustedLimit },
      {
        $facet: {
          data: [],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const [aggregationResult] = await ReviewTotal.aggregate(
      aggregationPipeline
    );
    const { data: bestBooks, totalCount: totalCountArray } = aggregationResult;
    const totalCount =
      totalCountArray.length > 0 ? totalCountArray[0].count : 0;

    const nextPageCheck = await ReviewTotal.find({
      createdAt: { $gte: oneMonthAgo },
    })
      .sort({ views: -1 })
      .skip(skip + limit)
      .limit(4)
      .countDocuments();

    const hasNextPage = nextPageCheck >= 4;

    if (bestBooks.length === 0) {
      const books = await Book.find({
        createdAt: { $gte: oneMonthAgo },
      })
        .sort({ views: -1 })
        .skip(skip)
        .limit(adjustedLimit);

      const nextPageCount = await Book.find({
        createdAt: { $gte: oneMonthAgo },
      })
        .sort({ views: -1 })
        .skip(skip + 1)
        .limit(4)
        .countDocuments();

      const hasNextPage = nextPageCount >= 4;

      const bestBooksMapped = books.map((book: IBook) => ({
        _id: book._id,
        bookDetails: book,
      }));

      const totalCount = await Book.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      return { bestBooks: bestBooksMapped, hasNextPage, totalCount };
    }

    return { bestBooks, hasNextPage, totalCount };
  } catch (err) {
    next(err);
  }
};
