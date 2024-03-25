import { deleteReview } from "../../pages/details/[bookId]/_components/review/services/deleteReview";
import { updateReview } from "../../pages/details/[bookId]/services/updateReview";
import { patchFavorItem } from "../../pages/search/services/patchFavorItem";

type DeleteReviewProps = {
  reviewId: string;
  userId: string;
};

type UpdateReviewProps = {
  userId: string;
  bookId: string;
  rating?: string;
  keyword?: string;
  desc?: string;
};

type PatchFavorItemProps = { userId: string | null; book: FavorItem };

export const MutateFns = {
  DELETE_REVIEW: ({ reviewId, userId }: DeleteReviewProps) =>
    deleteReview({ reviewId, userId }),
  PATCH_FAVOR_ITEM: ({ userId, book }: PatchFavorItemProps) =>
    patchFavorItem({ userId, book }),
  UPDATE_REVIEW: ({
    userId,
    bookId,
    rating,
    keyword,
    desc,
  }: UpdateReviewProps) =>
    updateReview({ userId, bookId, rating, keyword, desc }),
};
