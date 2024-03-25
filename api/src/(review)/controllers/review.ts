import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../middleware/error/utils";
import { handleGetReviews } from "../services/getReviews";
import { handlePostReview } from "../services/postReview";
import { handleUpdateReview } from "../services/updateReview";
import { handleDeleteReview } from "../services/deleteReview";
import { handleDeleteReviewById } from "../services/deleteReviewById";
import { handleGetReviewByUserId } from "../services/getReviewByUserId";
import { handleGetDocsLength } from "../services/getDocsLength";
import { handleGetUserReviewByBookId } from "../services/getUserReviewByBookId";

type FilterType = "_id" | "bookTitle" | "desc";

type QuerySortType = "최신순" | "좋아요 순" | "undefined" | undefined;

export const deleteReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewId = req.query.reviewId as string | undefined;
    const userId = req.query.userId as string | undefined;
    if (!reviewId || !userId) throw new HttpException(400, "Queries required.");

    try {
      const isDeleted = await handleDeleteReviewById(
        { reviewId, userId },
        next
      );

      if (isDeleted) {
        return res.status(201).json({ deletedReviewId: reviewId });
      }
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const getUserReviewByBookId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, bookId } = req.params;
    if (!userId || !bookId) throw new HttpException(400, "Params required.");

    const userReview = await handleGetUserReviewByBookId(
      { userId, bookId },
      next
    );

    if (userReview) {
      return res.status(200).json(userReview);
    }
  } catch (err) {
    next(err);
  }
};

export const getDocsLength = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.query.bookId as string | undefined;
    if (!bookId) throw new HttpException(400, "Book id required.");

    const docsLength = await handleGetDocsLength({ bookId }, next);

    if (typeof docsLength === "number") {
      return res.status(200).json({ docsLength: docsLength ?? 0 });
    }
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const pageNum = parseInt(req.query.pageNum as string);
    let sort = req.query.sort as string;

    if (!bookId) throw new HttpException(400, "Book Id required.");
    if (isNaN(pageNum)) throw new HttpException(400, "Page number required.");

    if (sort === "undefined" || sort === undefined) {
      throw new HttpException(400, "Sort query undefined.");
    } else {
      sort = decodeURIComponent(sort);
    }

    if (!["최신순", "좋아요 순"].includes(sort)) {
      throw new HttpException(400, "Invalid sort parameter.");
    }

    const reviews = await handleGetReviews(
      {
        bookId,
        pageNum,
        sort,
      },
      next
    );

    if (reviews) {
      return res.status(200).json(reviews);
    }
  } catch (err) {
    next(err);
  }
};

export const getReviewByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const sort = decodeURIComponent(req.query.sort as string) as
      | "최신순"
      | "오래된순";
    const filter = req.query.filter as FilterType | undefined;
    const keyword = req.query.keyword as string | undefined;
    const pageNum = req.body.pageNum as number | undefined;

    if (!userId) {
      throw new HttpException(400, "User Id required.");
    }

    if (filter && (!keyword?.trim() || keyword === "undefined")) {
      throw new HttpException(400, "Search term required.");
    }

    try {
      const reviews = await handleGetReviewByUserId(
        { userId, filter, keyword, pageNum, sort },
        next
      );

      if (reviews) {
        return res.status(200).json(reviews);
      }
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const postReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, bookId } = req.params;
    if (!userId || !bookId) throw new HttpException(400, "Params required.");

    const newReview = await handlePostReview(req, next);

    if (newReview) {
      return res.status(201).json(newReview);
    }
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.body;

    if (!userId) throw new HttpException(400, "User Id required.");
    if (!bookId) throw new HttpException(400, "Book Id required.");

    const updatedReview = await handleUpdateReview(req, next);

    return res.status(201).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const bookId = req.query.bookId as string | undefined;

    if (!userId) throw new HttpException(400, "User Id required.");
    if (!bookId) throw new HttpException(400, "Book Id required.");

    const _id = await handleDeleteReview({ userId, bookId }, next);

    return res.status(201).json(_id);
  } catch (err) {
    next(err);
  }
};
