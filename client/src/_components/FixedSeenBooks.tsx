import { books as seenBooks } from "../recoil/books";
import { useRecoilState } from "recoil";
import { seenModalState } from "../recoil/seen-modal";

import loading from "../assets/img_loading-clock.png";

import { SeenBookModal } from "../@modal";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../lib/react-query/query-key";
import { QueryFns } from "../lib/react-query/queryFn";
import { daysToMs } from "../lib/react-query/utils";
import { useHandleError } from "../pages/hooks/use-handle-error";

import { cn } from "../lib/utils";
import { usePrefetchBooks } from "../hooks/use-prefetch-books";

export default function FixedSeenBooks() {
  const [seenBookIds, _] = useState(
    JSON.parse(localStorage.getItem("seenBookIds") || "[]")
  );

  usePrefetchBooks(seenBookIds, [QueryKeys.SEEN_BOOKS]);

  const { data, isLoading, isSuccess, isError, error } = useQuery<
    IBook | undefined
  >({
    queryKey: [QueryKeys.SEEN_BOOK_LAST_ITEM],
    queryFn: () => QueryFns.GET_BOOK(seenBookIds[seenBookIds.length - 1]),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!seenBookIds[seenBookIds.length - 1],
  });

  const [show, setShow] = useRecoilState(seenModalState);

  const onClick = () => {
    setShow(true);
  };

  useHandleError({ isError, error });

  if (!seenBookIds || !seenBookIds.length) return null;

  if (isLoading) return <FixedSeenBooksSkeleton />;

  return (
    <>
      {isSuccess && data && (
        <div className="fixed-seen-books" onClick={onClick}>
          <div className="fixed-seen-books__wrap">
            <div className="img-wrap">
              <img src={data.representImg} alt="last-seen-book" />
            </div>
            <span className="text-wrap">{seenBookIds.length ?? 0}</span>
          </div>
        </div>
      )}
      {show && <SeenBookModal show={show} books={seenBooks} />}
    </>
  );
}

function FixedSeenBooksSkeleton() {
  return (
    <div className="fixed-seen-books">
      <div className="fixed-seen-books__wrap">
        <div className={cn("img-wrap", "loading")}>
          <img src={loading} alt="loading-img" className={cn("", "loading")} />
        </div>
        <span className="text-wrap">0</span>
      </div>
    </div>
  );
}
