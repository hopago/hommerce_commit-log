import cart from "../../../assets/ico_cart.png";

import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";

export default function CartButton() {
  const { user } = useUser();

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.CART_ITEM_LENGTH, user?.id],
    queryFn: () => QueryFns.GET_CART_ITEM_LENGTH(user?.id!),
    staleTime: daysToMs(Infinity),
    gcTime: daysToMs(Infinity),
    enabled: Boolean(user),
  });

  useHandleError({ error, isError, fieldName: "장바구니" });

  if (!user) return null;

  if (isSuccess) {
    return (
      <Link to="/cart" className="session-button cart">
        <img src={cart} alt="" />
        <span>{data?.docsLength ?? 0}</span>
      </Link>
    );
  }
}
