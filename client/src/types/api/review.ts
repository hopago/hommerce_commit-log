type ReviewRatingType = "1" | "2" | "3" | "4" | "5";
type ReviewRatingValue = 1 | 2 | 3 | 4 | 5;

type ReviewKeywords =
  | "쉬웠어요"
  | "집중돼요"
  | "도움돼요"
  | "최고에요"
  | "추천해요";

interface IReview extends Document {
  _id: string;
  buyWay: SellWay;
  bookId: string;
  bookTitle: string;
  userId: string;
  username: string;
  rating: ReviewRatingType;
  keyword: ReviewKeywords;
  desc: string;
  liked: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TPostReviewInput {
  rating: ReviewRatingType;
  keyword: ReviewKeywords;
  desc: string;
}

interface PaginatedReviewResponse {
  reviews: IReview[];
  pagination: {
    currentPage: number;
    totalReviews: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
