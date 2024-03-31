import { NextFunction, Request, Response } from "express";
import Book, { IBook } from "../models/book";
import UserData, { IUserData } from "../../(user)/model/user-data";

export const findRandomPicks = async (next: NextFunction) => {
  try {
    const randomPicks: IBook[] = await Book.aggregate([
      { $sample: { size: 10 } },
    ]);

    return randomPicks;
  } catch (err) {
    next(err);
  }
};

export const findUserPicks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: IUserData | null = await UserData.findOne({
      userId: new RegExp(`^${req.query.userId}$`, "i"),
    });

    if (userData) {
      const preferredCategories = Object.keys(userData.category) as Array<
        keyof typeof userData.category
      >;

      const recommendedBooks: IBook[] = await Book.find({
        category: { $in: preferredCategories },
      });

      return recommendedBooks;
    } else {
      if (!userData) {
        const randomPicks = await findRandomPicks(next);

        return randomPicks;
      }
    }
  } catch (err) {
    next(err);
  }
};
