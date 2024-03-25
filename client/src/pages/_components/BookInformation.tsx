import NextIcon from "./NextIcon";
import PrevIcon from "./PrevIcon";
import NextBooks from "./NextBooks";
import SingleBook from "./SingleBook";
import InfoTitle from "./InfoTitle";

import { bookParentCategory } from "./constants/category";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../lib/react-query/query-key";
import { daysToMs } from "../../lib/react-query/utils";
import { QueryFns } from "../../lib/react-query/queryFn";
import { useHandleError } from "../hooks/use-handle-error";
import { toast } from "sonner";

const FIRST_RENDER_ITEM_LENGTH = 4;

export default function BookInformation() {
  const [currIndex, setCurrIndex] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [QueryKeys.MONTHLY_PICKS, pageNum],
    queryFn: () =>
      QueryFns.FETCH_MONTHLY_PICKS({
        pageNum: pageNum > 0 ? pageNum + FIRST_RENDER_ITEM_LENGTH : pageNum,
        limit: 1,
      }),
    staleTime: daysToMs(31),
    gcTime: daysToMs(33),
  });

  useHandleError({ isError, error });

  // TODO: 커스텀 훅으로 빼기
  const prevBooks = useMemo(() => books, [books]);

  useEffect(() => {
    if (isSuccess && data && "bestBooks" in data) {
      const newBooks = data.bestBooks.map((book) => book.bookDetails);

      const isDuplicated = newBooks.some((newBook) =>
        prevBooks.find((book) => book._id === newBook._id)
      );

      if (isDuplicated && pageNum + 1 <= data.totalCount) {
        setPageNum((prev) => prev + 1);
      } else {
        setBooks([...prevBooks, ...newBooks]);
        setHasNextPage(data.hasNextPage);
      }
    }
  }, [isSuccess, data, prevBooks]);

  useEffect(() => {
    setPrevDisabled(currIndex === 0);
    setNextDisabled(!hasNextPage);
  }, [currIndex, books, hasNextPage]);

  const handlePrev = () => {
    if (currIndex !== 0) {
      setCurrIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!data || !data?.totalCount) {
      toast.error("데이터를 불러오던 중 무언가 문제가 생겼어요.");
      return;
    }

    if (currIndex + 3 < data.totalCount) {
      setCurrIndex((prev) => prev + 1);
      if (hasNextPage) {
        setPageNum((prev) => prev + 1);
      }
    }
  };

  if (isLoading) {
    // TODO: 로딩 컴포넌트
  }

  if (books.length > 0) {
    return (
      <div className="recommend-books__today-pick">
        <InfoTitle title="이달의 책" category={bookParentCategory} />
        <PrevIcon prevDisabled={prevDisabled} handlePrev={handlePrev} />
        <div className={"recommend-books__today-pick__contents"}>
          <SingleBook currentBook={books[0]} />
          <NextBooks currIndex={currIndex} books={books} />
        </div>
        <NextIcon nextDisabled={nextDisabled} handleNext={handleNext} />
      </div>
    );
  }
}
