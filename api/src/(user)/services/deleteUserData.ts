import { NextFunction } from "express";
import UserData from "../model/user-data";

export const handleDeleteUserData = async (
  { userId }: { userId: string },
  next: NextFunction
) => {
  try {
    const isDeleted = await UserData.findOneAndDelete({
      id: userId,
    });

    return isDeleted;
  } catch (err) {
    next(err);
  }
};
