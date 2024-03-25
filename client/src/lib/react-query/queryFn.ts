import { fetchBestSellers } from "../../pages/_components/services/fetchBestSellers";
import { fetchBookBySearchTerm } from "../../pages/_components/services/fetchBookBySearchTerm";
import { fetchMonthlyPicks } from "../../pages/_components/services/fetchBookInformation";
import { findBestAuthors } from "../../pages/_components/services/findBestAuthors";
import { getReviewReply } from "../../pages/details/[bookId]/_components/review/services/getReviewReply";
import { getUserReviewByBookId } from "../../pages/details/[bookId]/_components/review/services/getUserReviewByBookId";
import { findRecommendBookByCategory } from "../../pages/details/[bookId]/services/findRecommendBookByCategory";
import { findReferrerCategoryBestAuthors } from "../../pages/details/[bookId]/services/findReferrerCategoryBestAuthors";
import { getAuthor } from "../../pages/details/[bookId]/services/getAuthor";
import { getBook } from "../../pages/details/[bookId]/services/getBook";
import { getBookDetails } from "../../pages/details/[bookId]/services/getBookDetails";
import { getReviewDocsLength } from "../../pages/details/[bookId]/services/getReviewDocsLength";
import { getReviewsByBookId } from "../../pages/details/[bookId]/services/getReviewsByBookId";
import { getIsSubscribed } from "../../pages/search/services/getIsSubscribed";
import { getResultsTotal } from "../../pages/search/services/getResultsTotal";
import { getReviewTotalByBookId } from "../../pages/search/services/getReviewTotalByBookId";
import { getSubscriptionLength } from "../../pages/search/services/getSubscriptionLength";
import { ReviewSortOptions } from "../../recoil/review-select";

type LimitType = 1 | 3;

type FetchMonthlyPicksProps = {
  pageNum: number;
  limit: LimitType;
};

type FindReferrerCategoryBestAuthorsProps = {
  bookId?: string;
  category?: BookSubCategory;
};

type BookSearchResultsProps = {
  filter?: SearchType;
  searchTerm?: string;
  pageNum?: number;
  sort?: SearchSort;
};

type BookSearchResultsLengthProps = {
  filter: SearchType;
  keyword: string;
};

type GetReviewsByBookIdProps = {
  bookId: string;
  pageNum: number;
  sort: ReviewSortOptions;
};

type ReviewTotalProps = { bookId: string };

type GetFavorSubscriptionLengthProps = {
  bookId: string;
};

type GetFavorSubscriptionIsSubscribedProps = {
  bookId: string;
  userId: string;
};

type GetUserReviewByBookIdProps = {
  userId: string;
  bookId: string;
};

export const QueryFns = {
  FETCH_BEST_SELLERS: () => fetchBestSellers(),
  FETCH_MONTHLY_PICKS: ({ pageNum, limit }: FetchMonthlyPicksProps) =>
    fetchMonthlyPicks({ pageNum, limit }),
  FIND_REFERRER_CATEGORY_BEST_AUTHORS: ({
    bookId,
    category,
  }: FindReferrerCategoryBestAuthorsProps) =>
    findReferrerCategoryBestAuthors({ bookId, category }),
  FIND_BEST_AUTHORS: () => findBestAuthors(),
  FIND_RECOMMEND_BOOK_BY_CATEGORY: (category: BookSubCategory) =>
    findRecommendBookByCategory(category),
  GET_AUTHOR: (name: string) => getAuthor(name),
  GET_BOOK: (bookId: string) => getBook(bookId),
  GET_BOOK_DETAILS: (bookId: string) => getBookDetails(bookId),
  GET_BOOK_SEARCH_RESULTS: ({
    filter,
    searchTerm,
    sort,
    pageNum,
  }: BookSearchResultsProps) =>
    fetchBookBySearchTerm({ filter, searchTerm, sort, pageNum }),
  GET_BOOK_SEARCH_RESULTS_LENGTH: ({
    filter,
    keyword,
  }: BookSearchResultsLengthProps) =>
    getResultsTotal({ filter, searchTerm: keyword }),
  GET_REVIEWS_BY_BOOK_ID: ({
    bookId,
    pageNum,
    sort,
  }: GetReviewsByBookIdProps) => getReviewsByBookId({ bookId, pageNum, sort }),
  GET_REVIEW_REPLY: (reviewId: string) => getReviewReply(reviewId),
  GET_REVIEW_TOTAL_BY_BOOK_ID: ({ bookId }: ReviewTotalProps) =>
    getReviewTotalByBookId({ bookId }),
  GET_REVIEW_LENGTH: (bookId: string) => getReviewDocsLength(bookId),
  GET_FAVOR_SUBSCRIPTION_LENGTH: ({
    bookId,
  }: GetFavorSubscriptionLengthProps) => getSubscriptionLength({ bookId }),
  GET_FAVOR_SUBSCRIPTION_IS_SUBSCRIBED: ({
    bookId,
    userId,
  }: GetFavorSubscriptionIsSubscribedProps) =>
    getIsSubscribed({ bookId, userId }),
  GET_USER_REVIEW_BY_BOOK_ID: ({
    bookId,
    userId,
  }: GetUserReviewByBookIdProps) => getUserReviewByBookId({ bookId, userId }),
};
