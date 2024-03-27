import { NextFunction, Request } from "express";
import Cart from "../models/cart";
import { HttpException } from "../../../middleware/error/utils";
import { validateFields } from "../../../utils/validateFields";
import { isFieldsFullFilled } from "../../../utils/isFieldsFullFilled";

export const handleUpdateCartList = async (
  req: Request,
  next: NextFunction
) => {
  const fields = [
    "bookId",
    "title",
    "author",
    "img",
    "amount",
    "price",
    "unit",
  ];
  const requiredFields = ["bookId", "amount", "actionType"];

  validateFields(fields, req);
  isFieldsFullFilled(requiredFields, req);

  const { userId } = req.params;
  if (!userId) throw new HttpException(400, "Book id required.");

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new HttpException(404, "Cart not found.");

    const { actionType, amount, bookId, title, author, img, price, unit } =
      req.body;

    const bookIndex = cart.books.findIndex((book) => book.bookId === bookId);

    if (actionType === "add") {
      if (bookIndex !== -1) {
        cart.books[bookIndex].amount += amount;
      } else {
        cart.books.push({ bookId, title, author, img, amount, price, unit });
      }
    } else if (actionType === "remove") {
      if (bookIndex !== -1) {
        cart.books.splice(bookIndex, 1);
      } else {
        throw new HttpException(404, "Book not found in the cart.");
      }
    } else {
      throw new HttpException(400, "Invalid action actionType.");
    }

    await cart.save();
    return cart;
  } catch (err) {
    next(err);
  }
};
