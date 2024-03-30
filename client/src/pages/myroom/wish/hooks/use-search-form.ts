import { useQuery } from "@tanstack/react-query";

import { useDebouncedSearch } from "../../../hooks/use-debounced-search";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../lib/react-query/utils";
import { useHandleError } from "../../../hooks/use-handle-error";

export type BookFilterOption = "통합검색" | "제목" | "저자";

export type BookSortOption = "정확도순" | "조회순" | "최신순" | "오래된순";

type UseDebouncedSearchFormWithFilterProps = {
  filter: BookFilterOption;
  sort: BookSortOption;
  pageNum: number;
};

export const useDebouncedSearchFormWithFilter = ({
  filter,
  sort,
  pageNum,
}: UseDebouncedSearchFormWithFilterProps) => {
  const { debouncedSearchTerm, searchTerm, setSearchTerm, handleChange } =
    useDebouncedSearch();

  const {
    data: searchResults,
    error,
    isError,
    isLoading,
  } = useQuery<BookData>({
    queryKey: [QueryKeys.BOOK_SEARCH, debouncedSearchTerm],
    queryFn: () =>
      QueryFns.GET_BOOK_SEARCH_RESULTS({
        filter,
        searchTerm: debouncedSearchTerm,
        sort,
        pageNum,
      }),
    staleTime: daysToMs(5),
    gcTime: daysToMs(7),
    enabled: !!debouncedSearchTerm,
  });

  useHandleError({ error, isError, fieldName: "도서" });

  return {
    searchTerm,
    setSearchTerm,
    handleChange,
    isLoading,
    searchResults,
    error,
  };
};
