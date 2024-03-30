import { atom } from "recoil";

export const searchWishList = atom<boolean>({
  key: "searchWishList",
  default: false,
});
