import FixedSeenBooks from "../../_components/FixedSeenBooks";
import { Footer } from "../_components";
import FixedSearchBar from "../_components/FixedSearchBar";
import CartHeading from "./_components/CartHeading";
import CartList, { CartListSkeleton } from "./_components/CartList";
import ControlOverallCart from "./_components/ControlOverallCart";
import PaymentInfo from "./_components/PaymentInfo";

import { useSearchForm } from "../hooks/use-search-form";

import { getQueryClient } from "../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../lib/react-query/query-key";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "./services/getCart";
import { daysToMs } from "../../lib/react-query/utils";
import { Suspense } from "react";
import { useHandleError } from "../hooks/use-handle-error";

export default function CartIndex() {
  const { user } = useUser();
  const queryClient = getQueryClient();
  const data = queryClient.getQueryData<{ docsLength: number }>([
    QueryKeys.CART_ITEM_LENGTH,
    user?.id,
  ]);

  const { onSubmit, onChange, searchTerm } = useSearchForm();

  const {
    data: cartData,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: [QueryKeys.CART, user?.id],
    queryFn: () => getCart(user?.id!),
    staleTime: daysToMs(Infinity),
    gcTime: daysToMs(Infinity),
    enabled: !!user?.id,
  });

  useHandleError({ error, isError, fieldName: "장바구니" });

  return (
    <div id="cart-page">
      <FixedSearchBar
        onChange={onChange}
        searchTerm={searchTerm}
        onSubmit={onSubmit}
      />
      <header>
        <CartHeading itemLength={data?.docsLength ?? 0} />
      </header>
      <main>
        <section className="cart-control">
          <ControlOverallCart />
        </section>
        {isSuccess && cartData && (
          <Suspense fallback={<CartListSkeleton />}>
            <section className="cart-contents">
              <CartList books={cartData.books} />
              <aside>
                <PaymentInfo />
              </aside>
            </section>
          </Suspense>
        )}
      </main>
      <Footer />
      <FixedSeenBooks />
    </div>
  );
}
