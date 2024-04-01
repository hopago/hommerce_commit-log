import { useRecoilState, useRecoilValue } from "recoil";
import { searchSortState } from "../../../../recoil/search/search-page-sort";
import { searchPageEnabled } from "../../../../recoil/api/search-page-enabled";
import { searchFilterState } from "../../../../recoil/search/search-filter";

import { useEffect } from "react";

import { getKeyword } from "../../utils/get-keyword";
import { cn } from "../../../../lib/utils";
import { useScrollRef } from "../../../hooks/use-scroll-ref";
import { useHandleError } from "../../../hooks/use-handle-error";
import { UIType } from "../../hooks/use-select-ui";

import BookItem from "./BookItem";
import Spinner from "../../../../_components/common/Spinner";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { daysToMs } from "../../../../lib/react-query/utils";
import { ERROR_DETAILS } from "../../../../api/constants/errorDetails";
import { QueryFns } from "../../../../lib/react-query/queryFn";

type BookListProps = {
  display: UIType;
  currentPage: number;
};

export default function BookList({ display, currentPage }: BookListProps) {
  const filter = useRecoilValue(searchFilterState);
  const keyword = getKeyword();
  const sort = useRecoilValue(searchSortState);
  const [shouldRefetch, setShouldRefetch] = useRecoilState(searchPageEnabled);

  const { data, error, isSuccess, isLoading, isError, refetch } =
    useQuery<BookData>({
      queryKey: [QueryKeys.BOOK_SEARCH, currentPage],
      queryFn: () =>
        QueryFns.GET_BOOK_SEARCH_RESULTS({
          filter,
          searchTerm: keyword,
          sort,
          pageNum: currentPage,
        }),
      staleTime: daysToMs(1),
      gcTime: daysToMs(3),
      enabled: shouldRefetch,
    });

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.BOOKS_SEARCH_RESULTS,
  });

  useEffect(() => {
    setShouldRefetch(true);
  }, [currentPage, sort]);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
    }
  }, [shouldRefetch]);

  useEffect(() => {
    if (isSuccess) {
      setShouldRefetch(false);
    }
  }, [isSuccess]);

  const { scrollRef } = useScrollRef({ currentPage });

  if (isLoading) {
    return (
      <div className="search-contents__container__book-list">
        <Spinner text="데이터를 불러오는 중 입니다" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="search-contents__container__book-list" ref={scrollRef}>
        <ul className={cn("", display === "flex" ? "flex" : "grid")}>
          {data?.books?.map((book) => (
            <BookItem key={`${book._id}`} book={book} display={display} />
          ))}
        </ul>
      </div>
    );
  }
}
