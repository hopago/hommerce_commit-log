import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reviewTabState } from "../../../../../recoil/review/review-tab";
import { reviewSortOptionsState } from "../../../../../recoil/review/review-select";
import { currentPageState } from "../../../../../recoil/pagination/pageNum/paginate";
import { isAlreadyPostReview } from "../../../../../recoil/edit-user-review";
import { detailsPageEnabled } from "../../../../../recoil/api/details-page-review-enabled";

import PaginateControl from "../PaginateControl";
import ReviewList, { ReviewListLoadingComponent } from "./ReviewList";
import ReviewsSortTabList from "./ReviewsSortTabList";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";
import { getQueryClient } from "../../../../../lib/react-query/getQueryClient";

import { useScrollRef } from "../../../../hooks/use-scroll-ref";

import { useUser } from "@clerk/clerk-react";

export default function ReviewsDetails() {
  const { bookId } = useParams<{ bookId: string }>();
  const { user } = useUser();

  const setUserPosted = useSetRecoilState(isAlreadyPostReview);

  const currTab = useRecoilValue(reviewTabState);
  const sort = useRecoilValue(reviewSortOptionsState);
  const pageNum = useRecoilValue(currentPageState);
  const [shouldRefetch, setShouldRefetch] = useRecoilState(detailsPageEnabled);

  const queryClient = getQueryClient();

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

  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: [QueryKeys.REVIEWS, bookId],
    queryFn: () =>
      QueryFns.GET_REVIEWS_BY_BOOK_ID({ bookId: bookId!, pageNum, sort }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: shouldRefetch && !!bookId,
  });

  useHandleError({
    isError,
    error,
    errorDetails: ERROR_DETAILS.GET_REVIEWS_BY_BOOK_ID,
  });

  /* paginate & sort changed, force refetch */
  useEffect(() => {
    if (shouldRefetch) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.REVIEWS, bookId],
      });
      refetch();
    }
  }, [shouldRefetch]);

  useEffect(() => {
    if (isSuccess) {
      setShouldRefetch(false);
    }
  }, [isSuccess]);

  /* post or patch user-review */
  useEffect(() => {
    if (isUserPostedSuccess && userReview?._id) {
      setUserPosted(true);
    }
  }, [isUserPostedSuccess, user]);

  /* user review && filter-reviews */
  const [reviewsWithUserReview, setReviewsWithUserReview] = useState<IReview[]>(
    data?.reviews ?? []
  );

  useEffect(() => {
    if (userReview && data?.reviews?.length) {
      const filteredReviews = data.reviews.filter(
        (review) => review._id !== userReview._id
      );

      setReviewsWithUserReview([userReview, ...filteredReviews]);
    }
  }, [isUserPostedSuccess, isSuccess, userReview, data]);

  if (isLoading) return <LoadingComponent />;

  if (isSuccess) {
    const reviewsToDisplay =
      isUserPostedSuccess && userReview
        ? reviewsWithUserReview
        : data?.reviews ?? [];

    console.log(reviewsToDisplay);

    return (
      <div className="details-prod-reviews__wrap__reviews-details">
        <ReviewsSortTabList />
        <ReviewList ref={scrollRef} reviews={reviewsToDisplay} />
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
