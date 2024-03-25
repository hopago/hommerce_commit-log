import { NextFunction } from "express";
import Book from "../models/book";

export const findUserPicks = async (
  next: NextFunction
) => {
  try {
    const randomPicks = await Book.aggregate([{ $sample: { size: 10 } }]);

    return randomPicks;
  } catch (err) {
    next(err);
  }
};
