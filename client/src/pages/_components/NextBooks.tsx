import { useRecoilState } from "recoil";
import { booksState } from "../../recoil/books";

import NextBookItem from "./NextBookItem";

import { QueryKeys } from "../../lib/react-query/query-key";
import { useQuery } from "@tanstack/react-query";
import { QueryFns } from "../../lib/react-query/queryFn";
import { daysToMs } from "../../lib/react-query/utils";
import { useEffect } from "react";
import { useHandleError } from "../hooks/use-handle-error";

type NextBooksProps = {
  pageNum: number;
  setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  currIndex: number;
};

export default function NextBooks({
  pageNum,
  setNextDisabled,
  currIndex,
}: NextBooksProps) {
  const [books, setBooks] = useRecoilState(booksState);

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [QueryKeys.MONTHLY_PICKS_PREFETCH, pageNum],
    queryFn: () =>
      QueryFns.FETCH_MONTHLY_PICKS({
        pageNum,
        limit: 2,
      }),
    staleTime: daysToMs(31),
    gcTime: daysToMs(33),
    enabled: pageNum > 1,
  });

  useHandleError({ error, isError });

  useEffect(() => {
    if (isSuccess) {
      setBooks((prev) => {
        const previewBooks = data.bestBooks.map((book) => book.bookDetails);
        return prev ? [...prev, ...previewBooks] : previewBooks;
      });
    }
  }, [isSuccess, data, setBooks]);

  useEffect(() => {
    if (!data) return;

    if (data && !data.hasNextPage) {
      setNextDisabled(true);
    }
  }, [isSuccess]);

  return (
    <div className="recommend-books__today-pick__contents__preview">
      <ol>
        {books?.slice(currIndex + 1, currIndex + 4).map((book) => (
          <NextBookItem key={book._id} book={book} />
        ))}
      </ol>
    </div>
  );
}
