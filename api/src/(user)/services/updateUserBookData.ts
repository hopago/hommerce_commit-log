import { NextFunction, Request } from "express";
import { HttpException } from "../../middleware/error/utils";
import UserData from "../model/user-data";

export const handleUpdateUserBookData = async (
  req: Request,
  next: NextFunction
) => {
  let category = req.query.category as string | undefined;

  if (!category || category === "undefined") {
    next(new HttpException(400, "Query required."));
    return;
  }

  category = decodeURIComponent(category);

  try {
    const userData = await UserData.updateOne(
      { id: req.params.userId },
      { $inc: { [`category.${category}`]: 1 } }
    );
    if (!userData) throw new HttpException(404, "User data not found.");

    return true;
  } catch (err) {
    next(err);
  }
};
