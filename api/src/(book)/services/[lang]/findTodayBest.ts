import { NextFunction, Request, Response } from "express"; // Response 타입 추가
import ReviewTotal from "../../../(review)/(total)/models/review-total";
import { PipelineStage, Types } from "mongoose";
import { HttpException } from "../../../middleware/error/utils";
import Book, { IBook } from "../../models/book";
import { filterLangToKor } from "../../utils/filterLangToKor";
import { findRandomPicks } from "../findUserPicks";

type BestBook = {
  _id: Types.ObjectId;
  averageRating: number;
  reviewCount: number;
  bookDetails: IBook;
}[];

type RequestLangQueryValue = "kor" | "en" | string | undefined | "undefined";

export const findTodayBest = async (req: Request, next: NextFunction) => {
  let langCategory = req.query.lang as RequestLangQueryValue;
  langCategory = filterLangToKor(langCategory);

  const targetCategory = req.query.category as
    | BookSubCategory
    | undefined
    | "undefined";
  if (!langCategory) throw new HttpException(400, "Book category not found.");

  try {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const aggregationPipeline: PipelineStage[] = [
      { $match: { createdAt: { $gte: oneMonthAgo } } },
      {
        $group: {
          _id: "$bookId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
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
      { $match: { "bookDetails.parentCategory": langCategory } },
    ];

    if (targetCategory) {
      aggregationPipeline.push({
        $match: { "bookDetails.category": targetCategory },
      });
    }

    aggregationPipeline.push(
      { $sort: { averageRating: -1, "bookDetails.views": -1 } },
      { $limit: 10 }
    );

    const aggregationResults = await ReviewTotal.aggregate(aggregationPipeline);
    const todayBest = aggregationResults.map((result) => {
      const { averageRating, reviewCount, bookDetails } = result;
      const updatedBookDetails = {
        ...bookDetails,
        _id: result._id,
      };

      return {
        averageRating,
        reviewCount,
        ...updatedBookDetails,
      };
    });

    // temporary
    if (!todayBest.length) {
      return await findRandomPicks(next);
    }

    return todayBest;
  } catch (err) {
    next(err);
  }
};
