import { NextFunction, Request } from "express";
import { HttpException } from "../../middleware/error/utils";
import Author from "../models/author";

export const handleGetAuthor = async (req: Request, next: NextFunction) => {
  try {
    const { authorId } = req.params;
    if (!authorId) throw new HttpException(400, "Author id required.");

    try {
      const author = await Author.findById(authorId);
      if (!author) throw new HttpException(404, "Author not found.");

      return author;
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
