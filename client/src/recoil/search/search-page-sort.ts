import { atom } from "recoil";

import { BookSortOption } from "../../pages/myroom/wish/hooks/use-search-form";

export const searchSortState = atom<BookSortOption>({
  key: "searchSortState",
  default: "정확도순",
});
