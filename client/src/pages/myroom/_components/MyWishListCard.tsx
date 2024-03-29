import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";
import { toast } from "sonner";
import { useHandleError } from "../../hooks/use-handle-error";
import { Skeleton } from "@nextui-org/skeleton";

export default function MyWishListCard({ userId }: { userId: string }) {
  const { data, isSuccess, error, isError } = useQuery({
    queryKey: [QueryKeys.USER_FAVOR_LIST, userId],
    queryFn: () => QueryFns.GET_FAVOR_LIST(userId!),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!userId,
  });

  useHandleError({ error, isError, fieldName: "위시리스트" });

  const isLoading = true;

  if (isLoading) return <MyWishListCardLoadingComponent />;

  if (isSuccess && data) {
    if (!Array.isArray(data)) {
      toast.info("위시리스트가 아직 없어요.");
      return null;
    }

    if (data.length === 0) {
      return (
        <div className="my-wish-list">
          <h1>서재 목록</h1>
          <div className="my-wish-list__content">
            <div className="col no-content">
              <h1>#위시리스트</h1>
              <span>담겨있는 상품/콘텐츠가 아직 없습니다.</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="my-wish-list">
          <h1>서재 목록</h1>
          <div className="my-wish-list__content">
            <img
              src={data[data.length - 1].img}
              alt={data[data.length - 1].title}
            />
            <div className="col">
              <h1>#위시리스트</h1>
              <div className="span-wrap">
                <span className="plus">+</span>
                <span>{data.length}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function MyWishListCardLoadingComponent() {
  return (
    <div className="my-wish-list">
      <Skeleton className="skeleton h1" />
      <div className="my-wish-list__content">
        <Skeleton className="skeleton img" />
        <div className="col">
          <Skeleton className="skeleton title" />
          <Skeleton className="skeleton span" />
        </div>
      </div>
    </div>
  );
}
