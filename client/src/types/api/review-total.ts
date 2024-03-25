import { ReviewKeywords } from "../../pages/_components/types/review";

interface IReviewTotal {
  _id: string;
  bookId: string;
  recordedRating: Record<ReviewRatingType, number>;
  totalRating: number;
  ratingEachPert: Partial<Record<ReviewRatingType, number>>;
  recordedKeyword: Record<ReviewKeywords, number>;
  totalKeyword: ReviewKeywords;
  keywordEachPert: Partial<Record<ReviewKeywords, number>>;
}

export type ReviewTotalData = {
  total: IReviewTotal;
  reviewsLength: number;
};
