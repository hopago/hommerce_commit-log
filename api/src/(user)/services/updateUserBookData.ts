import { NextFunction, Request } from "express";
import { HttpException } from "../../middleware/error/utils";
import UserData from "../model/user-data";

export const handleUpdateUserBookData = async (
  req: Request,
  next: NextFunction
) => {
  const userId = req.params.userId as string | undefined;
  if (!userId) {
    next(new HttpException(400, "User Id required."));
    return;
  }
  const category = req.query.category as
    | BookSubCategory
    | undefined
    | "undefined";
  if (!category || category === "undefined") {
    next(new HttpException(400, "Query required."));
    return;
  }

  try {
    const userData = await UserData.updateOne(
      { id: userId },
      { $inc: { [`category.${category}`]: 1 } }
    );
    if (!userData) throw new HttpException(404, "User data not found.");

    return true;
  } catch (err) {
    next(err);
  }
};
