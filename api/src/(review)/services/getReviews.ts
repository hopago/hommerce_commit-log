import { NextFunction } from "express";
import Review from "../models/review";
import { HttpException } from "../../middleware/error/utils";

const perPage = 10;

type QuerySortType = "최신순" | "좋아요 순";

type HandleGetReviewProps = {
  bookId: string;
  pageNum: number;
  sort: string;
};

export const handleGetReviews = async (
  { bookId, pageNum = 1, sort = "최신순" }: HandleGetReviewProps,
  next: NextFunction
) => {
  const skip = (pageNum - 1) * perPage;

  const getSortCondition: any = (sort: QuerySortType) => {
    switch (decodeURIComponent(sort)) {
      case "최신순":
        return { createdAt: -1 };
      case "좋아요 순":
        return { likes: -1 };
      default:
        return { createdAt: -1 };
    }
  };

  try {
    const reviews = await Review.find({ bookId })
      .sort(getSortCondition(sort))
      .skip(skip)
      .limit(perPage);

    const totalReviews = await Review.countDocuments({ bookId });
    if (!totalReviews && totalReviews !== 0)
      throw new HttpException(404, "Review not found.");

    const totalPages = Math.ceil(totalReviews / perPage);
    const hasNextPage = skip + perPage < totalReviews;

    return {
      reviews,
      pagination: {
        currentPage: pageNum,
        totalReviews,
        totalPages,
        hasNextPage,
      },
    };
  } catch (err) {
    next(err);
  }
};
