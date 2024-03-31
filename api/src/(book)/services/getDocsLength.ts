import { NextFunction, Request, Response } from "express";
import { FilterQuery } from "mongoose";
import Book, { IBook } from "../models/book";

type FilterType = "통합검색" | "제목" | "저자";

export const getDocsLength = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let filter = req.query.filter as FilterType | undefined;
  let keyword = req.query.keyword as string | undefined;

  if (!filter) {
    filter = "통합검색";
  }

  try {
    let query: FilterQuery<IBook> = {};

    if (keyword && keyword.trim() !== "" && keyword !== "undefined") {
      keyword = decodeURIComponent(keyword);
      const regex = new RegExp(keyword, "i");

      const filterOptions: Record<FilterType, string[]> = {
        통합검색: ["title", "author", "publisher"],
        제목: ["title"],
        저자: ["author"],
      };

      const searchFields = filterOptions[filter] || filterOptions["통합검색"];

      if (searchFields.length > 1) {
        query.$or = searchFields.map((field) => ({
          [field]: { $regex: regex },
        }));
      } else {
        query[searchFields[0]] = { $regex: regex };
      }
    }

    const docsLength = await Book.countDocuments(query);

    return res.status(200).json({ docsLength });
  } catch (err) {
    next(err);
  }
};
