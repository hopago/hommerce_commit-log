import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../middleware/error/utils";
import { findBestSellers } from "../services/findBestSellers";
import { findUserPicks } from "../services/findUserPicks";
import { findMonthlyPicks } from "../services/findMonthlyPicks";

// TODO: 유저 클릭 기반 카테고리 수집 후 findUserPicks

const bestBooksQueries: BestBooksQueryType[] = [
  "bestsellers",
  "userPicks",
  "monthlyPicks",
];

const queryActions = {
  bestsellers: findBestSellers,
  userPicks: findUserPicks,
  monthlyPicks: findMonthlyPicks,
};

export const getBestBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const type = req.query.type as BestBooksQueryType;

  if (!type || !bestBooksQueries.includes(type)) {
    return next(
      new HttpException(400, "Query required or invalid query type.")
    );
  }

  try {
    const action = queryActions[type];
    if (!action) {
      throw new HttpException(400, "Invalid type");
    }

    const result = await action(next);

    if (result && Array.isArray(result) && result.length > 0) {
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};
