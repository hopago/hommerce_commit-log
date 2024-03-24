import { useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { reviewTabState } from "../../../../../recoil/review-tab";
import { reviewSortOptionsState } from "../../../../../recoil/review-select";
import { currentPageState } from "../../../../../recoil/review-paginate";

import PaginateControl from "../PaginateControl";
import ReviewList from "./ReviewList";
import ReviewsSortTabList from "./ReviewsSortTabList";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";

import { useScrollRef } from "../../../../hooks/use-scroll-ref";

export default function ReviewsDetails() {
  const { bookId } = useParams<{ bookId: string }>();

  const currTab = useRecoilValue(reviewTabState);
  const sort = useRecoilValue(reviewSortOptionsState);
  const pageNum = useRecoilValue(currentPageState);

  /* paginate-scroll-behavior */
  const { scrollRef } = useScrollRef({ currentPage: pageNum });

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.REVIEWS, bookId],
    queryFn: () =>
      QueryFns.GET_REVIEWS_BY_BOOK_ID({ bookId: bookId!, pageNum, sort }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!bookId,
  });

  useHandleError({
    isError,
    error,
    errorDetails: ERROR_DETAILS.GET_REVIEWS_BY_BOOK_ID,
  });

  if (isLoading) return <LoadingComponent />;

  if (isSuccess) {
    return (
      <div className="details-prod-reviews__wrap__reviews-details">
        <ReviewsSortTabList />
        <ReviewList ref={scrollRef} reviews={data!.reviews} />
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
    </div>
  );
}
