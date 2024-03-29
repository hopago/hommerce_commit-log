import { useUser } from "@clerk/clerk-react";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";

import pointIcon from "../../../assets/ico_p.png";

import { Skeleton } from "@nextui-org/skeleton";

export default function CurrentPoint() {
  const { user } = useUser();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QueryKeys.POINT, user?.id],
    queryFn: () => QueryFns.GET_USER_POINT(user?.id!),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!user,
  });

  useHandleError({ error, isError, fieldName: "포인트" });

  if (isLoading) return <CurrentPointSkeleton />;

  if (data) {
    return (
      <div className="current-point">
        <div className="current-point__wrap">
          <img src={pointIcon} alt="point-icon" />
          <div className="col">
            <h1>통합포인트</h1>
            <span>{data.toLocaleString()}P</span>
          </div>
        </div>
      </div>
    );
  }
}

function CurrentPointSkeleton() {
  return (
    <div className="current-point">
      <div className="current-point__wrap loading skeleton">
        <Skeleton className="skeleton img" />
        <div className="col">
          <Skeleton className="skeleton h1" />
          <div className="skeleton-gap">
            <Skeleton className="skeleton span" />
          </div>
        </div>
      </div>
    </div>
  );
}
