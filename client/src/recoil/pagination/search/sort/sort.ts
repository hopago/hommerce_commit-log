import { atom } from "recoil";

import { BookSortOption } from "../../../../pages/myroom/wish/hooks/use-search-form";

type DefaultSortOption = "최신순" | "오래된순";

export const pointSortState = atom<"최신순" | "오래된순">({
  key: "paginationPointSortState",
  default: "최신순",
});

export const reviewSortState = atom<"최신순" | "오래된순">({
  key: "paginationReviewSortState",
  default: "최신순",
});

export const searchPageSortState = atom<DefaultSortOption | BookSortOption>({
  key: "searchPageSortState",
  default: "정확도순",
});

export const myRoomSortState = atom<DefaultSortOption | BookSortOption>({
  key: "myRoomSearchSortState",
  default: "정확도순",
});
