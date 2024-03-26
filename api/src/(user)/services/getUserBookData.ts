import { NextFunction } from "express";
import UserData from "../model/user-data";
import { HttpException } from "../../middleware/error/utils";

export const handleGetUserBookData = async (
  { userId }: { userId: string },
  next: NextFunction
) => {
  try {
    const userBookData = await UserData.findOne({ id: userId });

    if (!userBookData) {
      throw new HttpException(404, "User data not found.");
    }

    return userBookData;
  } catch (err) {
    next(err);
  }
};
