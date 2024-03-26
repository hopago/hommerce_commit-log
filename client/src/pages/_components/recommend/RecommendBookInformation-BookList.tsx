import { useUser } from "@clerk/clerk-react";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";

import RecommendBookInformationBookItem, {
  RecommendBookInformationBookItemSkeleton,
} from "./RecommendBookInformation-BookItem";

import { useHandleError } from "../../hooks/use-handle-error";

export default function RecommendBookInformationBookList() {
  const { user } = useUser();

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [QueryKeys.USER_PICKS],
    queryFn: () => QueryFns.FETCH_USER_PICKS(user?.id),
    staleTime: daysToMs(7),
    gcTime: daysToMs(9),
  });

  useHandleError({ isError, error });

  if (isLoading) return <RecommendBookInformationBookListSkeleton />;

  if (isSuccess && data.length > 0) {
    return (
      <div className="recommend-books__user__horizontal__book-list">
        <ul>
          {data?.slice(0, 4).map((book, i) => (
            <RecommendBookInformationBookItem
              key={book._id}
              book={book}
              i={i}
            />
          ))}
        </ul>
      </div>
    );
  }
}

function RecommendBookInformationBookListSkeleton() {
  return (
    <div className="recommend-books__user__horizontal__book-list">
      <ul>
        {[...Array.from({ length: 4 })].map((_, i) => (
          <RecommendBookInformationBookItemSkeleton key={i} />
        ))}
      </ul>
    </div>
  );
}
