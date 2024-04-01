import { reviewSortState } from "../../../../recoil/pagination/search/sort/sort";
import {
  ReviewFilterOption,
  reviewFilterState,
} from "../../../../recoil/pagination/search/filter/filter";
import { reviewSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { reviewEnabledState } from "../../../../recoil/pagination/enabled/enabled";
import { useRecoilState, useRecoilValue } from "recoil";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../lib/react-query/utils";

import { useEffect } from "react";
import { useHandleError } from "../../../hooks/use-handle-error";
import { useScrollRef } from "../../../hooks/use-scroll-ref";
import usePagination from "../../../hooks/use-pagination";

import { DataTableSkeleton } from "../../point/_component/TableSkeleton";
import { NoContent } from "../../_components/NoContent";
import FilterReviewLogs from "./FilterReviewLogs";
import PaginateControl from "../../../details/[bookId]/_components/PaginateControl";
import ReviewTable from "./ReviewTable";

export default function ReviewLogsTable({ userId }: { userId: string }) {
  const sort = useRecoilValue(reviewSortState);
  const filter = useRecoilValue<ReviewFilterOption>(reviewFilterState);
  const searchTerm = useRecoilValue(reviewSearchTermState);
  const {
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleSetPage,
    handleMoveToFirstPage,
    handleMoveToLastPage,
  } = usePagination();
  const [enabled, setEnabled] = useRecoilState(reviewEnabledState);

  const { scrollRef } = useScrollRef({ currentPage });

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
    isRefetchError,
  } = useQuery<PaginatedReviewResponse | undefined>({
    queryKey: [QueryKeys.USER_REVIEW, userId],
    queryFn: () =>
      QueryFns.GET_USER_REVIEW({
        pageNum: currentPage,
        filter,
        searchTerm,
        userId,
        sort,
      }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: enabled && Boolean(userId),
  });

  /* paginate & sort changed, force refetch */
  useEffect(() => {
    setEnabled(true);
  }, [currentPage, sort]);

  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled]);

  useEffect(() => {
    if (isSuccess) {
      setEnabled(false);
    }
  }, [isSuccess]);

  useHandleError({ error, isError, fieldName: "리뷰" });

  if (isLoading) return <DataTableSkeleton />;

  if (isSuccess && !data?.reviews?.length)
    return (
      <NoContent
        queryKey={[QueryKeys.USER_REVIEW, userId]}
        refetch={refetch}
        error={error}
        isRefetching={isRefetching}
        isRefetchError={isRefetchError}
        fieldName="리뷰"
      />
    );

  if (isSuccess && data?.reviews?.length) {
    return (
      <div ref={scrollRef} className="point-logs review">
        <h1>리뷰 활동내역</h1>
        <FilterReviewLogs />
        <ReviewTable
          userId={userId}
          isLoading={isLoading}
          reviews={data.reviews as ReviewLogs}
          dataLength={data?.pagination.totalReviews!}
        />
        {data?.pagination && data?.pagination?.totalPages > 1 && (
          <PaginateControl
            pageTotal={data?.pagination.totalPages}
            currentPage={currentPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handleSetPage={handleSetPage}
            handleMoveToFirstPage={handleMoveToFirstPage}
            handleMoveToLastPage={handleMoveToLastPage}
          />
        )}
      </div>
    );
  }
}
