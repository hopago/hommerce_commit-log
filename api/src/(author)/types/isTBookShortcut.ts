import { IBook } from "../../(book)/models/book";

type TBookShortcutKeys =
  | "author"
  | "category"
  | "representImg"
  | "title"
  | "id"
  | "price"
  | "discount";

export const isTBookShortcut = (obj: any): obj is IBook => {
  const keys: TBookShortcutKeys[] = [
    "author",
    "category",
    "representImg",
    "title",
    "id",
    "price",
    "discount",
  ];
  return keys.every((key) => obj.hasOwnProperty(key));
};

export const validateBooks = (books: any): books is IBook[] => {
  if (!Array.isArray(books)) {
    return false;
  }
  return books.every(isTBookShortcut);
};
