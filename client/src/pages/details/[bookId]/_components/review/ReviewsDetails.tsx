import { useEffect, useMemo } from "react";

import { useParams } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
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

  const [userPosted, setUserPosted] = useRecoilState(isAlreadyPostReview);

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
      setUserPosted({
        isAlreadyPosted: true,
        initUserReview: {
          userId: user?.id!,
          username: user?.username!,
          bookTitle: userReview.bookTitle,
          review: {
            rating: userReview.rating,
            keyword: userReview.keyword,
            desc: userReview.desc,
          },
        },
      });
    }
  }, [isUserPostedSuccess, user]);

  useHandleError({
    isError,
    error,
    errorDetails: ERROR_DETAILS.GET_REVIEWS_BY_BOOK_ID,
  });

  const reviewsWithUserReview = useMemo(() => {
    if (
      userReview &&
      !data?.reviews.some((review) => review._id === userReview._id)
    ) {
      return [userReview, ...data!.reviews];
    }
    return data?.reviews || [];
  }, [userReview, data]);

  if (isLoading) return <LoadingComponent />;

  if (isSuccess) {
    return (
      <div className="details-prod-reviews__wrap__reviews-details">
        <ReviewsSortTabList />
        <ReviewList
          ref={scrollRef}
          reviews={user ? reviewsWithUserReview : data!.reviews}
        />
        {data!.pagination.totalPages > 1 && (
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
