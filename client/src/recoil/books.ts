import { atom, selectorFamily } from "recoil";

/* API 연동 STATE */
// TODO: 이름 구체화 + 홈페이지 슬라이더에서 사용 중
export const booksState = atom<IBook[] | null>({
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
      const books = get(booksState);
      if (books) {
        return books[index];
      }
    },
  set:
    (index: number) =>
    ({ set, get }) => {
      const books = get(booksState);
      if (books) {
        const currentBook = books[index];
        set(currentBookState, currentBook);
      }
    },
});
