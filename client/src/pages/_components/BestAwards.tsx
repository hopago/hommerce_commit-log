import { bookParentCategory } from "./constants/category";

import BestSellerItem, { BestSellerItemSkeleton } from "./BestSellerItem";
import InfoTitle from "./InfoTitle";

import { useQuery } from "@tanstack/react-query";
import { QueryFns } from "../../lib/react-query/queryFn";
import { QueryKeys } from "../../lib/react-query/query-key";
import { daysToMs } from "../../lib/react-query/utils";
import { useHandleError } from "../hooks/use-handle-error";

export default function BestAwards() {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.BEST_SELLERS],
    queryFn: QueryFns.FETCH_BEST_SELLERS,
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
  });

  useHandleError({ error, isError });

  if (isLoading) return <BestAwardsLoadingComponent />;

  const renderBestsellers = (book: IBook | BestBook, i: number) => {
    if (Object.keys(book).includes("averageRating")) {
      const bestsellers = book as BestBook;

      return (
        <BestSellerItem key={book._id} book={bestsellers.bookDetails} i={i} />
      );
    } else {
      return <BestSellerItem key={book._id} book={book as IBook} i={i} />;
    }
  };

  if (isSuccess && data.length > 1) {
    return (
      <div id="best-steady" className="recommend-books">
        <div className="recommend-books__best-seller">
          <InfoTitle
            title="베스트 | 스테디"
            className="best-seller"
            category={bookParentCategory}
          />
          <div className="recommend-books__best-seller__grid">
            <ul className="recommend-books__best-seller__grid__contents">
              {data?.map((book, i) => renderBestsellers(book, i))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function BestAwardsLoadingComponent() {
  return (
    <div className="recommend-books">
      <div className="recommend-books__best-seller">
        <InfoTitle
          title="베스트 | 스테디"
          className="best-seller"
          category={bookParentCategory}
        />
        <div className="recommend-books__best-seller__grid">
          <ul className="recommend-books__best-seller__grid__contents">
            {[...Array.from({ length: 10 })].map((_, i) => (
              <BestSellerItemSkeleton key={i} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
