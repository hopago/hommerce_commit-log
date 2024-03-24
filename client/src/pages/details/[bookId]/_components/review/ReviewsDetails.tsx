import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { reviewTabState } from "../../../../../recoil/review-tab";
import { reviewSortOptionsState } from "../../../../../recoil/review-select";
import { currentPageState } from "../../../../../recoil/review-paginate";
import { isAlreadyPostReview } from "../../../../../recoil/edit-user-review";

import PaginateControl from "../PaginateControl";
import ReviewList, { ReviewListLoadingComponent } from "./ReviewList";
import ReviewsSortTabList from "./ReviewsSortTabList";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";

import { useScrollRef } from "../../../../hooks/use-scroll-ref";
import { useUser } from "@clerk/clerk-react";

export default function ReviewsDetails() {
  const { bookId } = useParams<{ bookId: string }>();
  const { user } = useUser();

  const setUserPosted = useSetRecoilState(isAlreadyPostReview);

  const currTab = useRecoilValue(reviewTabState);
  const sort = useRecoilValue(reviewSortOptionsState);
  const pageNum = useRecoilValue(currentPageState);

  /* paginate-scroll-behavior */
  const { scrollRef } = useScrollRef({ currentPage: pageNum });

  const { data: userReview, isSuccess: isUserPostedSuccess } = useQuery({
    queryKey: [QueryKeys.REVIEW, user?.id],
    queryFn: () =>
      QueryFns.GET_USER_REVIEW_BY_BOOK_ID({
        userId: user?.id!,
        bookId: bookId!,
      }),
    staleTime: daysToMs(Infinity),
    gcTime: daysToMs(Infinity),
    enabled: !!user,
  });

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.REVIEWS, bookId],
    queryFn: () =>
      QueryFns.GET_REVIEWS_BY_BOOK_ID({ bookId: bookId!, pageNum, sort }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!bookId,
  });

  useEffect(() => {
    if (isUserPostedSuccess && userReview?._id) {
      setUserPosted(true);
    }
  }, [isUserPostedSuccess, user]);

  useHandleError({
    isError,
    error,
    errorDetails: ERROR_DETAILS.GET_REVIEWS_BY_BOOK_ID,
  });

  const [reviewsWithUserReview, setReviewsWithUserReview] = useState<IReview[]>(
    data?.reviews ?? []
  );

  console.log("삭제 후 유저 리뷰", userReview);
  console.log("삭제 후 리뷰 배열", data?.reviews);

  useEffect(() => {
    if (userReview && data) {
      if (data.reviews.some((review) => review._id === userReview._id)) {
        const filteredReviews = data.reviews.filter(
          (review) => review._id !== userReview._id
        );
        setReviewsWithUserReview([userReview, ...filteredReviews]);
      }
    }
  }, [isUserPostedSuccess, isSuccess, userReview, data]);

  console.log("필터 된 리뷰 배열", reviewsWithUserReview);

  if (isLoading) return <LoadingComponent />;

  if (isSuccess) {
    return (
      <div className="details-prod-reviews__wrap__reviews-details">
        <ReviewsSortTabList />
        <ReviewList
          ref={scrollRef}
          reviews={userReview?._id ? reviewsWithUserReview : data!.reviews}
        />
        {data?.pagination && data.pagination.totalPages > 1 && (
          <PaginateControl pageTotal={data!.pagination.totalPages} />
        )}
      </div>
    );
  }
}

function LoadingComponent() {
  return (
    <div className="details-prod-reviews__wrap__reviews-details">
      <ReviewsSortTabList />
      <ReviewListLoadingComponent />
      <PaginateControl pageTotal={10} />
    </div>
  );
}
