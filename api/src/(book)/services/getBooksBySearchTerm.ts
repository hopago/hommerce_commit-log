import { NextFunction } from "express";
import Book, { IBook } from "../models/book";
import { FilterQuery } from "mongoose";
import { HttpException } from "../../middleware/error/utils";
import { PAGE_SIZE } from "../../constants/page";

type FilterType = "통합검색" | "제목" | "저자" | "title" | "author";

type SortType = "최신순" | "정확도순" | "조회순" | "오래된순";

type QueryField = {
  filter?: FilterType;
  keyword?: string;
  pageNum?: number;
  sort: SortType;
};

const getSortCondition: any = (sort: SortType) => {
  switch (sort) {
    case "최신순":
      return { createdAt: -1 };
    case "정확도순":
      // TODO: SORT
      return { createdAt: 1 };
    case "조회순":
      return { views: -1 };
    case "오래된순":
      return { createdAt: 1 };
    default:
      return { createdAt: -1 };
  }
};

export const handleGetBooksBySearchTerm = async (
  { filter = "통합검색", keyword, pageNum = 1, sort = "최신순" }: QueryField,
  next: NextFunction
) => {
  let query: FilterQuery<IBook> = {};

  if (keyword?.trim() && keyword !== "undefined") {
    const regex = new RegExp(keyword, "i");

    const filterOptions: Record<FilterType, string[]> = {
      통합검색: ["title", "author", "publisher"],
      제목: ["title"],
      title: ["title"],
      저자: ["author"],
      author: ["author"],
    };

    const searchFields = filterOptions[filter] || filterOptions["통합검색"];

    if (searchFields.length > 1) {
      query.$or = searchFields.map((field) => ({ [field]: { $regex: regex } }));
    } else {
      query[searchFields[0]] = { $regex: regex };
    }
  }

  try {
    const totalBooks = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / PAGE_SIZE);

    if (!totalBooks && totalBooks !== 0)
      throw new HttpException(404, "Book not found.");

    let books;

    if (pageNum) {
      books = await Book.find(query)
        .skip(PAGE_SIZE * (pageNum - 1))
        .limit(PAGE_SIZE)
        .sort(getSortCondition(sort));
    } else {
      books = await Book.find(query)
        .limit(PAGE_SIZE)
        .sort(getSortCondition(sort));
    }

    const response = {
      books,
      ...(pageNum && {
        pagination: {
          currentPage: pageNum,
          totalBooks,
          totalPages,
        },
      }),
    };

    return response;
  } catch (err) {
    next(err);
  }
};
