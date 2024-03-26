import { NextFunction } from "express";
import UserData from "../model/user-data";

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
    }
  } catch (err) {
    next(err);
  }
};
