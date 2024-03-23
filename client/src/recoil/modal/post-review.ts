import { atom } from "recoil";

export const postReviewModal = atom<boolean>({
  key: "postReviewModal",
  default: false,
});