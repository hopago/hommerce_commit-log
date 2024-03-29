import { useUser } from "@clerk/clerk-react";

import { useRecoilState, useRecoilValue } from "recoil";
import { pointSortState } from "../../../../recoil/pagination/search/sort/sort";
import { pointFilterState } from "../../../../recoil/pagination/search/filter/filter";
import { pointSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { pointEnabledState } from "../../../../recoil/pagination/enabled/enabled";
import { currentPageState } from "../../../../recoil/pagination/pageNum/paginate";

import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { PointFilterOption } from "../services/getUserPointLog";
import { daysToMs } from "../../../../lib/react-query/utils";

import { useEffect } from "react";

import { useHandleError } from "../../../hooks/use-handle-error";
import { useScrollRef } from "../../../hooks/use-scroll-ref";

import { NoContent } from "../../_components/NoContent";
import { DataTableSkeleton } from "./TableSkeleton";
import UserPoint from "./UserPoint";
import FilterPointLogs from "./FilterPointLogs";
import PointLogTable from "./PointLogTable";
import PaginateControl from "../../../details/[bookId]/_components/PaginateControl";
import { QueryFns } from "../../../../lib/react-query/queryFn";

export default function PointLogsTable() {
  const { user } = useUser();

  const sort = useRecoilValue(pointSortState);
  const filter = useRecoilValue<PointFilterOption>(pointFilterState);
  const searchTerm = useRecoilValue(pointSearchTermState);
  const [enabled, setEnabled] = useRecoilState(pointEnabledState);
  const currentPage = useRecoilValue(currentPageState);

  const queryClient = getQueryClient();

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
        userId: user?.id!,
        sort,
      }),
    staleTime: daysToMs(7),
    gcTime: daysToMs(9),
    enabled: enabled && Boolean(user),
  });

  useEffect(() => {
    if (enabled) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_POINT_LOG, currentPage],
      });
      refetch();
    }
  }, [enabled, searchTerm, sort]);

  useEffect(() => {
    if (isSuccess) {
      setEnabled(false);
    }
  }, [isSuccess]);

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
          queryKey={[QueryKeys.USER_POINT_LOG, user?.id!]}
          fieldName="포인트 기록"
        />
      </div>
    );

  if (isSuccess && data?.pointsLogs.length) {
    return (
      <div className="point-logs" ref={scrollRef}>
        <h1>포인트 기록</h1>
        <UserPoint userId={user?.id!} />
        <FilterPointLogs />
        <PointLogTable
          pointLogs={data.pointsLogs as PointLogs}
          isLoading={isLoading}
        />
        <PaginateControl pageTotal={data?.pagination.totalPages!} />
      </div>
    );
  }
}
