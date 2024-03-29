import { atom, selectorFamily } from "recoil";

export const imageSlideBookState = atom<IBook[] | null>({
  key: "booksState",
  default: null,
});

export const currentBookState = atom<IBook | null>({
  key: "currentBookState",
  default: null,
});

export const selectedCurrentBook = selectorFamily({
  key: "selectedCurrentBook",
  get:
    (index: number) =>
    ({ get }) => {
      const books = get(imageSlideBookState);
      if (books) {
        return books[index];
      }
    },
  set:
    (index: number) =>
    ({ set, get }) => {
      const books = get(imageSlideBookState);
      if (books) {
        const currentBook = books[index];
        set(currentBookState, currentBook);
      }
    },
});
