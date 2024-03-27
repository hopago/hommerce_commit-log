import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../../middleware/error/utils";
import { findTodayPicks } from "../../services/[lang]/findTodayPicks";
import { findTodayBest } from "../../services/[lang]/findTodayBest";
import { findNewBook } from "../../services/[lang]/findNewBook";
import { Types } from "mongoose";
import { IBook } from "../../models/book";

const booksQueries: LangPageBestBookQueries[] = [
  "todaypicks",
  "todaybest",
  "newbook",
];

type BestBook = {
  _id: Types.ObjectId;
  averageRating: number;
  reviewCount: number;
  bookDetails: IBook;
}[];

const queryActions: {
  todaypicks: (
    req: Request,
    next: NextFunction
  ) => Promise<
    | (IBook & {
        averageRating: number;
        reviewCount: number;
      })[]
    | undefined
  >;
  todaybest: (
    req: Request,
    next: NextFunction
  ) => Promise<
    | (IBook & {
        averageRating: number;
        reviewCount: number;
      })[]
    | undefined
  >;
  newbook: (req: Request, next: NextFunction) => Promise<IBook[] | undefined>;
} = {
  todaypicks: findTodayPicks,
  todaybest: findTodayBest,
  newbook: findNewBook,
};

export const getTodayPicks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.query.type as LangPageBestBookQueries;

    if (!type || !booksQueries.includes(type)) {
      throw new HttpException(400, "Query required or invalid query type.");
    }

    const action = queryActions[type];
    if (!action) {
      throw new HttpException(400, "Invalid type");
    }

    const result: unknown = await action(req, next);
    if (!result) throw new HttpException(404, "Book not found.");

    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};
