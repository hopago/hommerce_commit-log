import { atom } from "recoil";

export const pointSortState = atom<"최신순" | "오래된순">({
  key: "paginationPointSortState",
  default: "최신순",
});
