import { NextFunction } from "express";
import ReviewTotal from "../../(review)/(total)/models/review-total";

export const findMonthlyPicks = async (
  next: NextFunction
) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const bestBooks = await ReviewTotal.aggregate([
      {
        $match: {
          createdAt: { $gte: oneMonthAgo },
        },
      },
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
        $match: {
          "bookDetails.createdAt": { $gte: oneMonthAgo },
        },
      },
      {
        $sort: { "bookDetails.views": -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return bestBooks;
  } catch (err) {
    next(err);
  }
};
