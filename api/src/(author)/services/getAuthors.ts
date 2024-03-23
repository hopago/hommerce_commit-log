import { NextFunction, Request, Response } from "express";
import Author from "../models/author";

export const handleGetAuthors = async (
  req: Request,
  next: NextFunction
) => {
  const nameQuery = req.query.name as string;

  try {
    const name =
      nameQuery !== "undefined" ? decodeURIComponent(nameQuery) : undefined;

    const query = name ? { name } : {};
    const projection = name ? undefined : { sort: { createdAt: -1 }, limit: 7 };

    const foundAuthors = await Author.find(query, null, projection);

    return foundAuthors;
  } catch (err) {
    next(err);
  }
};
