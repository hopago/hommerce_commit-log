import { QueryKey } from "@tanstack/react-query";
import { getQueryClient } from "../lib/react-query/getQueryClient";
import { QueryFns } from "../lib/react-query/queryFn";
import { daysToMs } from "../lib/react-query/utils";

export const usePrefetchBooks = (ids: string[], queryKey: QueryKey) => {
  const queryClient = getQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn: () => QueryFns.FIND_BOOKS_BY_IDS(ids),
      staleTime: daysToMs(1),
      gcTime: daysToMs(3),
    });
  };

  return {
    prefetch,
  };
};
