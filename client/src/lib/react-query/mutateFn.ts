import { deleteReview } from "../../pages/details/[bookId]/_components/review/services/deleteReview";
import { likeReview } from "../../pages/details/[bookId]/_components/review/services/likeReview";
import { patchReviewReply } from "../../pages/details/[bookId]/_components/review/services/patchReviewReply";
import { postReviewReply } from "../../pages/details/[bookId]/_components/review/services/postReviewReply";
import { deleteReviewReply } from "../../pages/details/[bookId]/services/deleteReviewReply";
import { updateReview } from "../../pages/details/[bookId]/services/updateReview";
import { updateUser } from "../../pages/myroom/@modal/userEdit/services/updateUser";
import { deleteReviewByIds } from "../../pages/myroom/review/services/deleteReviewByIds";
import { deleteFavorItemsByBookIds } from "../../pages/myroom/wish/services/deleteFavorItemsByBookIds";
import { patchFavorItem } from "../../pages/search/services/patchFavorItem";
import { updateCart } from "../../services/updateCart";

type DeleteReviewProps = {
  reviewId: string;
  userId: string;
};

type DeleteReviewReplyProps = {
  reviewId: string;
  userId: string;
};

type UpdateCartProps = CartActionRequestBody & { userId: string };

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

type UpdateUserProps = {
  imageUrl?: string;
  username: string;
};

export const MutateFns = {
  DELETE_FAVOR_ITEM_BY_IDS: (userId: string, ids: string[]) =>
    deleteFavorItemsByBookIds(userId, ids),
  DELETE_REVIEW: ({ reviewId, userId }: DeleteReviewProps) =>
    deleteReview({ reviewId, userId }),
  DELETE_REVIEW_REPLY: ({ reviewId, userId }: DeleteReviewReplyProps) =>
    deleteReviewReply({ reviewId, userId }),
  DELETE_REVIEW_BY_IDS: (ids: string[] | string) => deleteReviewByIds(ids),
  LIKE_REVIEW: (reviewId: string, userId: string | undefined | null) =>
    likeReview(reviewId, userId),
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
  UPDATE_CART: ({
    userId,
    actionType,
    amount,
    bookId,
    title,
    author,
    img,
    price,
    unit,
  }: UpdateCartProps) =>
    updateCart({
      userId,
      actionType,
      bookId,
      amount,
      title,
      author,
      img,
      price,
      unit,
    }),
  UPDATE_REVIEW: ({
    userId,
    bookId,
    rating,
    keyword,
    desc,
  }: UpdateReviewProps) =>
    updateReview({ userId, bookId, rating, keyword, desc }),
  UPDATE_USER: ({ username, imageUrl }: UpdateUserProps) =>
    updateUser({ username, imageUrl }),
};
