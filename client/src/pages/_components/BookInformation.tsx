import NextIcon from "./NextIcon";
import PrevIcon from "./PrevIcon";
import NextBooks, { NextBooksSkeleton } from "./NextBooks";
import SingleBook, { SingleBookSkeleton } from "./SingleBook";
import InfoTitle from "./InfoTitle";

import { bookParentCategory } from "./constants/category";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../lib/react-query/query-key";
import { daysToMs } from "../../lib/react-query/utils";
import { QueryFns } from "../../lib/react-query/queryFn";
import { useHandleError } from "../hooks/use-handle-error";

import { useInfinityFetching } from "./hooks/use-infinity-fetching";

const FIRST_PREFETCH_LENGTH = 6;

const isLoading = true;

export default function BookInformation() {
  const [pageNum, setPageNum] = useState(1);
  const [currIndex, setCurrIndex] = useState(0);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: [QueryKeys.MONTHLY_PICKS],
    queryFn: () =>
      QueryFns.FETCH_MONTHLY_PICKS({
        pageNum,
        limit: FIRST_PREFETCH_LENGTH,
      }),
    staleTime: daysToMs(31),
    gcTime: daysToMs(33),
    enabled: pageNum === 1,
  });

  useHandleError({ isError, error });

  const {
    books,
    handleNext,
    handlePrev,
    nextDisabled,
    prevDisabled,
    setNextDisabled,
  } = useInfinityFetching({
    data,
    isSuccess,
    setPageNum,
    currIndex,
    setCurrIndex,
  });

  if (isLoading) return <BookInformationSkeleton />;

  if (isSuccess && books) {
    return (
      <div className="recommend-books__today-pick">
        <InfoTitle title="이달의 책" category={bookParentCategory} />
        <PrevIcon prevDisabled={prevDisabled} handlePrev={handlePrev} />
        <div className={"recommend-books__today-pick__contents"}>
          <SingleBook index={currIndex} />
          <NextBooks
            pageNum={pageNum}
            setNextDisabled={setNextDisabled}
            currIndex={currIndex}
          />
        </div>
        <NextIcon nextDisabled={nextDisabled} handleNext={handleNext} />
      </div>
    );
  }
}

function BookInformationSkeleton() {
  return (
    <div className="recommend-books__today-pick">
      <InfoTitle title="이달의 책" category={bookParentCategory} />
      <div className={"recommend-books__today-pick__contents"}>
        <SingleBookSkeleton />
        <NextBooksSkeleton />
      </div>
    </div>
  );
}
