import { NextFunction, Request, Response } from "express";
import Book from "../models/book";

export const findUserPicks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const randomPicks = await Book.aggregate([{ $sample: { size: 10 } }]);

    return randomPicks;
  } catch (err) {
    next(err);
  }
};
