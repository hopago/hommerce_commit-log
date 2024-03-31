import { NextFunction, Request } from "express";
import Cart from "../models/cart";
import { HttpException } from "../../../middleware/error/utils";

import { ICart } from "../models/cart";

export const handlePostCartItem = async (
  req: Request,
  next: NextFunction,
  userIdParams?: string
) => {
  const { userId } = req.params;
  if (!userId) throw new HttpException(400, "User Id required.");

  const newCartItem = new Cart({
    userId: userId ?? userIdParams,
  });

  try {
    const savedCartItem = await newCartItem.save();

    return savedCartItem;
  } catch (err) {
    next(err);
  }
};
