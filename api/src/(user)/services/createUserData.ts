import { NextFunction } from "express";
import UserData from "../model/user-data";
import { HttpException } from "../../middleware/error/utils";

export const handleCreateUserData = async (
  { userId }: { userId: string },
  next: NextFunction
) => {
  try {
    const isDuplicated = await UserData.findOne({
      id: userId,
    });

    if (!isDuplicated) {
      const newUserData = new UserData({
        id: userId,
      });
      await newUserData.save();

      return true;
    } else {
      throw new HttpException(409, "User already exist.");
    }
  } catch (err) {
    next(err);
  }
};
