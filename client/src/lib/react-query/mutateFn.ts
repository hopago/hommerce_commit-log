import { deleteReview } from "../../pages/details/[bookId]/_components/review/services/deleteReview";
import { patchReviewReply } from "../../pages/details/[bookId]/_components/review/services/patchReviewReply";
import { postReviewReply } from "../../pages/details/[bookId]/_components/review/services/postReviewReply";
import { deleteReviewReply } from "../../pages/details/[bookId]/services/deleteReviewReply";
import { updateReview } from "../../pages/details/[bookId]/services/updateReview";
import { patchFavorItem } from "../../pages/search/services/patchFavorItem";

type DeleteReviewProps = {
  reviewId: string;
  userId: string;
};

type DeleteReviewReplyProps = {
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

type PatchReviewReplyProps = { userId: string; reviewId: string; desc: string };

type PostReviewReplyProps = {
  userId: string;
  username: string;
  reviewId: string;
  desc: string;
};

export const MutateFns = {
  DELETE_REVIEW: ({ reviewId, userId }: DeleteReviewProps) =>
    deleteReview({ reviewId, userId }),
  DELETE_REVIEW_REPLY: ({ reviewId, userId }: DeleteReviewReplyProps) =>
    deleteReviewReply({ reviewId, userId }),
  PATCH_FAVOR_ITEM: ({ userId, book }: PatchFavorItemProps) =>
    patchFavorItem({ userId, book }),
  PATCH_REVIEW_REPLY: ({ userId, reviewId, desc }: PatchReviewReplyProps) =>
    patchReviewReply({ userId, reviewId, desc }),
  POST_REVIEW_REPLY: ({
    userId,
    username,
    reviewId,
    desc,
  }: PostReviewReplyProps) =>
    postReviewReply({ userId, username, reviewId, desc }),
  UPDATE_REVIEW: ({
    userId,
    bookId,
    rating,
    keyword,
    desc,
  }: UpdateReviewProps) =>
    updateReview({ userId, bookId, rating, keyword, desc }),
};
