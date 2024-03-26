import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useRecoilState } from "recoil";
import { booksState } from "../../../recoil/books";

type UseInfinityFetchingProps = {
  data: MonthlyPicksResponse | undefined;
  isSuccess: boolean;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  currIndex: number;
  setCurrIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const useInfinityFetching = ({
  data,
  isSuccess,
  setPageNum,
  currIndex,
  setCurrIndex,
}: UseInfinityFetchingProps) => {
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [books, setBooks] = useRecoilState(booksState);

  useEffect(() => {
    if (isSuccess && data && "bestBooks" in data) {
      const newBooks = data.bestBooks.map((book) => book.bookDetails);
      if (!books) {
        setBooks(newBooks);
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!data) return;

    if (data && !data.hasNextPage) {
      setNextDisabled(true);
    }
  }, [currIndex, books]);

  useEffect(() => {
    if (isSuccess) {
      if (
        data &&
        data.totalCount &&
        currIndex >= 0 &&
        currIndex <= data.totalCount - 3
      ) {
        setPrevDisabled(false);
        setNextDisabled(false);
      } else {
        setPrevDisabled(currIndex <= 0);
        setNextDisabled(currIndex >= data!.totalCount - 3);
      }
    }
  }, [isSuccess, currIndex, data]);

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
      const newPageNum = Math.floor(currIndex / 2) + 1;
      setPageNum(newPageNum);
    }
  };

  return {
    handleNext,
    handlePrev,
    books,
    currIndex,
    nextDisabled,
    prevDisabled,
    setNextDisabled,
  };
};
