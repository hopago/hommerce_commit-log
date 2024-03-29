import { atom } from "recoil";

import { PointFilterOption } from "../../../../pages/myroom/point/services/getUserPointLog";

export type ReviewFilterOption = "검색 옵션" | "책 제목" | "리뷰 내용";

export const pointFilterState = atom<PointFilterOption>({
  key: "paginationPointFilterState",
  default: "검색 옵션",
});

export const reviewFilterState = atom<ReviewFilterOption>({
  key: "paginationPointFilterState",
  default: "검색 옵션",
});
