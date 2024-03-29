import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";

export default function MyWishListCard({ userId }: { userId: string }) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QueryKeys.USER_FAVOR_LIST, userId],
    queryFn: () => QueryFns.GET_FAVOR_LIST(userId!),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!userId,
  });

  return (
    <div className="my-wish-list">
      <h1>#위시리스트</h1>
      <div className="my-wish-list__wrap">
        <img src="" alt="point-icon" />
        <div className="col">
          <h1>통합포인트</h1>
          <span></span>
        </div>
      </div>
    </div>
  );
}
