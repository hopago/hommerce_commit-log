import ReviewsKeywords from "./ReviewsKeywords";
import ReviewsTotalRating from "./ReviewsTotalRating";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { ServerError } from "../../../../../fetcher/error";

type ReviewsTotalProps = {
  bookId: string | undefined;
};

export default function ReviewsTotals({ bookId }: ReviewsTotalProps) {
  if (!bookId) return;

  const { data, isSuccess, error } = useQuery({
    queryKey: [QueryKeys.REVIEW_TOTAL, bookId],
    queryFn: () => QueryFns.GET_REVIEW_TOTAL_BY_BOOK_ID({ bookId }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!bookId,
  });

  const isReviewNotWritten =
    error instanceof ServerError &&
    error.status === 404 &&
    error.message === "Review total not found.";

  if (isSuccess && !isReviewNotWritten && data.total) {
    return (
      <div className="details-prod-reviews__wrap__reviews-total__inner">
        <ReviewsTotalRating
          totalRating={data.total.totalRating}
          ratingEachPert={data.total.ratingEachPert}
        />
        <ReviewsKeywords keywordEachPert={data.total.keywordEachPert} />
      </div>
    );
  }
}
