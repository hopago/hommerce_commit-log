import { NextFunction, Request, Response } from "express";
import Author from "../models/author";
import { Types } from "mongoose";
import { HttpException } from "../../middleware/error/utils";

export const findBestAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topAuthors = await Author.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "books._id",
          foreignField: "bookId",
          as: "bookReviews",
        },
      },
      {
        $unwind: "$books",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          avgRating: { $avg: "$bookReviews.rating" },
          totalReviews: { $sum: 1 },
          totalViews: { $sum: "$books.views" },
        },
      },
      {
        $addFields: {
          score: {
            $add: [
              { $multiply: ["$avgRating", 3] },
              { $multiply: ["$totalReviews", 2] },
              { $multiply: ["$totalViews", 1] },
            ],
          },
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $limit: 7,
      },
    ]);

    try {
      const topAuthorIds: Types.ObjectId[] = topAuthors.map(
        (author) => author._id
      );
      const authorDetails = await Author.find({
        _id: { $in: topAuthorIds },
      });
      
      if (authorDetails) {
        return res.status(200).json(authorDetails);
      } else {
        throw new HttpException(404, "Author not found.");
      }
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
