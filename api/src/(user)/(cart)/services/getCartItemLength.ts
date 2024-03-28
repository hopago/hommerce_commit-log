import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../../middleware/error/utils";
import Cart from "../models/cart";

export const getCartItemLength = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.query.userId;
  if (!userId || userId === "undefined")
    throw new HttpException(400, "User Id required.");

  try {
    const userCart = await Cart.findOne({
      userId: { $regex: new RegExp("^" + userId + "$", "i") },
    });
    if (!userCart) throw new HttpException(400, "User cart not found.");

    return res.status(200).json({ docsLength: userCart.books.length });
  } catch (err) {
    next(err);
  }
};
