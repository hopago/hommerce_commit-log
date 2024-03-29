import { useUser } from "@clerk/clerk-react";

import { reviewSortState } from "../../../../recoil/pagination/search/sort/sort";
import {
  ReviewFilterOption,
  reviewFilterState,
} from "../../../../recoil/pagination/search/filter/filter";
import { reviewSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { reviewEnabledState } from "../../../../recoil/pagination/enabled/enabled";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPageState } from "../../../../recoil/pagination/pageNum/paginate";

import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../lib/react-query/utils";

import { useEffect } from "react";
import { useHandleError } from "../../../hooks/use-handle-error";
import { useScrollRef } from "../../../hooks/use-scroll-ref";

import { DataTableSkeleton } from "../../point/_component/TableSkeleton";
import { NoContent } from "../../_components/NoContent";
import FilterReviewLogs from "./FilterReviewLogs";
import PaginateControl from "../../../details/[bookId]/_components/PaginateControl";
import ReviewTable from "./ReviewTable";

export default function ReviewLogsTable() {
  const { user } = useUser();

  const sort = useRecoilValue(reviewSortState);
  const filter = useRecoilValue<ReviewFilterOption>(reviewFilterState);
  const searchTerm = useRecoilValue(reviewSearchTermState);
  const [enabled, setEnabled] = useRecoilState(reviewEnabledState);
  const currentPage = useRecoilValue(currentPageState);

  const queryClient = getQueryClient();

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
    queryKey: [QueryKeys.USER_REVIEW, user?.id],
    queryFn: () =>
      QueryFns.GET_USER_REVIEW({
        pageNum: currentPage,
        filter,
        searchTerm,
        userId: user?.id!,
        sort,
      }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: enabled && Boolean(user?.id),
  });

  useEffect(() => {
    if (enabled) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_REVIEW, currentPage],
      });
      refetch();
    }
  }, [enabled, searchTerm, sort]);

  useEffect(() => {
    if (isSuccess) {
      setEnabled(false);
    }
  }, [isSuccess]);

  useHandleError({ error, isError, fieldName: "리뷰" });

  const { scrollRef } = useScrollRef({ currentPage });

  if (isLoading) return <DataTableSkeleton />;

  if (isSuccess && !data?.reviews?.length)
    return (
      <NoContent
        queryKey={[QueryKeys.USER_REVIEW, user?.id]}
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
          userId={user?.id!}
          isLoading={isLoading}
          reviews={data.reviews as ReviewLogs}
          dataLength={data?.pagination.totalReviews!}
        />
        <PaginateControl pageTotal={data?.pagination.totalPages!} />
      </div>
    );
  }
}
