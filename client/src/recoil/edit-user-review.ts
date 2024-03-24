import { atom } from "recoil";
import { MutationProps } from "../pages/details/[bookId]/_components/review/@modal/post-review/services/use-post-review";

interface isAlreadyPostReview {
  isAlreadyPosted: boolean;
  initUserReview: null | MutationProps;
}

export const isAlreadyPostReview = atom<isAlreadyPostReview>({
  key: "isAlreadyPostReview",
  default: {
    isAlreadyPosted: false,
    initUserReview: null,
  },
});
