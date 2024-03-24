import { atom } from "recoil";

export const isAlreadyPostReview = atom<boolean>({
  key: "isAlreadyPostReview",
  default: false,
});
