import { atom } from "recoil";

import { PointFilterOption } from "../../../../pages/myroom/point/services/getUserPointLog";

export const pointFilterState = atom<PointFilterOption>({
  key: "paginationPointFilterState",
  default: "검색 옵션",
});
