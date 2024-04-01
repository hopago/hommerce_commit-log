import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { pointSortState } from "../../../../recoil/pagination/search/sort/sort";
import { pointFilterState } from "../../../../recoil/pagination/search/filter/filter";
import { pointSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { pointEnabledState } from "../../../../recoil/pagination/enabled/enabled";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { PointFilterOption } from "../services/getUserPointLog";
import { daysToMs } from "../../../../lib/react-query/utils";
import { QueryFns } from "../../../../lib/react-query/queryFn";

import { useHandleError } from "../../../hooks/use-handle-error";
import { useScrollRef } from "../../../hooks/use-scroll-ref";
import usePagination from "../../../hooks/use-pagination";

import { NoContent } from "../../_components/NoContent";
import { DataTableSkeleton } from "./TableSkeleton";
import UserPoint from "./UserPoint";
import FilterPointLogs from "./FilterPointLogs";
import PointLogTable from "./PointLogTable";
import PaginateControl from "../../../details/[bookId]/_components/PaginateControl";

export default function PointLogsTable({ userId }: { userId: string }) {
  const sort = useRecoilValue(pointSortState);
  const filter = useRecoilValue<PointFilterOption>(pointFilterState);
  const searchTerm = useRecoilValue(pointSearchTermState);
  const [enabled, setEnabled] = useRecoilState(pointEnabledState);
  const {
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleSetPage,
    handleMoveToFirstPage,
    handleMoveToLastPage,
  } = usePagination();

  const {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isRefetchError,
  } = useQuery<PointLogsResponse>({
    queryKey: [QueryKeys.USER_POINT_LOG, currentPage],
    queryFn: () =>
      QueryFns.GET_USER_POINT_LOG({
        pageNum: currentPage,
        filter,
        searchTerm,
        userId,
        sort,
      }),
    staleTime: daysToMs(7),
    gcTime: daysToMs(9),
    enabled: enabled && !!userId,
  });

  useEffect(() => {
    setEnabled(true);
  }, [currentPage, sort]);

  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled]);

  useHandleError({ error, isError, fieldName: "포인트" });

  const { scrollRef } = useScrollRef({ currentPage });

  if (isLoading) return <DataTableSkeleton />;

  if (isSuccess && !data?.pointsLogs?.length)
    return (
      <div className="point-logs">
        <NoContent
          text="포인트 기록이 아직 없네요."
          refetch={refetch}
          error={error}
          isRefetching={isRefetching}
          isRefetchError={isRefetchError}
          queryKey={[QueryKeys.USER_POINT_LOG, userId]}
          fieldName="포인트 기록"
        />
      </div>
    );

  if (isSuccess && data?.pointsLogs.length) {
    return (
      <div className="point-logs" ref={scrollRef}>
        <h1>포인트 기록</h1>
        <UserPoint userId={userId} />
        <FilterPointLogs />
        <PointLogTable
          pointLogs={data.pointsLogs as PointLogs}
          isLoading={isLoading}
        />
        <PaginateControl
          pageTotal={data?.pagination.totalPages}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleSetPage={handleSetPage}
          handleMoveToFirstPage={handleMoveToFirstPage}
          handleMoveToLastPage={handleMoveToLastPage}
        />
      </div>
    );
  }
}
