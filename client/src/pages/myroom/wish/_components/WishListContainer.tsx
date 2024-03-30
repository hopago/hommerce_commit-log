import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";

import WishList from "./WishList";
import WishListActionsButtons from "./WishListActionsButtons";

import { QueryFns } from "../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../lib/react-query/utils";
import { useHandleError } from "../../../hooks/use-handle-error";

export default function WishListContainer({ userId }: { userId: string }) {
  const { data, error, isError } = useQuery({
    queryKey: [QueryKeys.USER_FAVOR_LIST, userId],
    queryFn: () => QueryFns.GET_FAVOR_LIST(userId!),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!userId,
  });

  useHandleError({ error, isError, fieldName: "위시리스트" });

  if (Array.isArray(data) && data.length > 0) {
    return (
      <div className="wish-list-container">
        <WishListActionsButtons favorList={data} />
        <WishList favorList={data} />
      </div>
    );
  }
}
