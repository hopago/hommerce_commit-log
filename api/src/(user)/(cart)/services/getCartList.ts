import { NextFunction, Request } from "express";
import Cart from "../models/cart";
import { HttpException } from "../../../middleware/error/utils";
import User from "../../model/user";
import { handleDatabaseOperation } from "../../../utils/db-operation";
import { ICart } from "../models/cart";

export const handleGetCartList = async (req: Request, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new HttpException(400, "User Id required.");

    const user = await handleDatabaseOperation(
      User.findOne({
        id: userId,
      }),
      next
    );
    if (!user) throw new HttpException(404, "User not found.");

    const cartList = await Cart.findOne({
      userId,
    }).sort({ createdAt: -1 });
    if (!cartList) throw new HttpException(404, "Cart not found.");

    return cartList;
  } catch (err) {
    next(err);
  }
};
