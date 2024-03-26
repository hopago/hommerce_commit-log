import { useEffect, useRef, useState } from "react";

import { useFilterOption } from "./hooks/use-filter-option";

import Heading from "./_components/Heading";
import FilterOptions from "./_components/FilterOptions";
import SeenBooks from "./_components/SeenBooks";

import { QueryKeys } from "../../lib/react-query/query-key";
import { useQuery } from "@tanstack/react-query";
import { QueryFns } from "../../lib/react-query/queryFn";
import { daysToMs } from "../../lib/react-query/utils";
import { useHandleError } from "../../pages/hooks/use-handle-error";

type SeenBookListProps = {
  show: boolean;
};

export default function SeenBookModal({ show }: SeenBookListProps) {
  const [seenBookIds, _] = useState<string[]>(
    JSON.parse(localStorage.getItem("seenBookIds") || "[]")
  );

  const { data, isError, error, isSuccess } = useQuery<IBook[] | undefined>({
    queryKey: [QueryKeys.SEEN_BOOKS],
    queryFn: () => QueryFns.FIND_BOOKS_BY_IDS(seenBookIds),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: seenBookIds.length > 0,
  });

  useHandleError({ error, isError });

  const { option, onClick } = useFilterOption();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.style.transition = "all 0.3s ease";
      modalRef.current.className = "seen-book-list__wrap right-pop";
    }
  }, [show]);

  if (isSuccess && data) {
    return (
      <div className="seen-book-list">
        <div className="bg-fill" />
        <div className="seen-book-list__wrap" ref={modalRef}>
          <Heading />
          <FilterOptions onClick={onClick} option={option} />
          <SeenBooks books={data} option={option} />
        </div>
      </div>
    );
  }
}
