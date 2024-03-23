import { GNB } from "../../[lang]/_components";
import { SearchSection } from "../../_components";

import SingleBook from "./_components/singleBook/SingleBook";
import FixedPurchaseShortcut from "./_components/FixedPurchaseShortcut";
import FixedDetailsTabList from "./_components/FixedDetailsTabList";
import DetailsContents from "./_components/DetailsContents";
import BookReviews from "./_components/book/BookReviews";
import AuthorInfo from "./_components/author/AuthorInfo";
import FAQ from "./_components/faq/FAQ";

import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { setGNBCategory } from "../../../recoil/use-category";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../api/constants/errorDetails";
import { increaseView } from "./services/increaseView";

import { cn } from "../../../lib/utils";
import Spinner from "../../../_components/Spinner";
import { useObserver } from "./hooks/use-observer";

export type DetailsIndexIds = "prod-info" | "prod-review";

export default function DetailsIndex() {
  const params = useParams();
  const { bookId } = params;

  const setCategory = useSetRecoilState(setGNBCategory);

  const prodInfoRef = useRef(null);
  const reviewRef = useRef(null);

  const [currSellType, setCurrSellType] = useState<SellWay>("종이책");

  const { setReObserve, isInView } = useObserver({
    ref1: prodInfoRef,
    ref2: reviewRef,
  });

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.BOOK, bookId],
    queryFn: () => QueryFns.GET_BOOK(bookId!),
    staleTime: daysToMs(14),
    gcTime: daysToMs(17),
    enabled: !!bookId,
  });

  useHandleError({ error, isError, errorDetails: ERROR_DETAILS.GET_BOOK });

  useEffect(() => {
    setCategory({
      parentCategory: data?.parentCategory,
      category: data?.category,
    });
    setReObserve(true);
  }, [isSuccess]);

  useEffect(() => {
    if (bookId) {
      increaseView(bookId);
    }
  }, [bookId]);


  if (isLoading) return <DetailsIndexLoadingComponent />;

  if (isSuccess) {
    return (
      <>
        <SearchSection />
        <FixedDetailsTabList isInView={isInView} />
        <GNB />
        <SingleBook
          book={data!}
          currSellType={currSellType}
          setCurrSellType={setCurrSellType}
        />
        <DetailsContents
          ref={prodInfoRef}
          bookId={bookId}
          category={data?.category}
          lang={data?.parentCategory}
          setReObserve={setReObserve}
        />
        <AuthorInfo authorName={data!.author} />
        <BookReviews ref={reviewRef} bookId={bookId} />
        <FAQ />
        <FixedPurchaseShortcut
          price={currSellType === "종이책" ? data!.price : data!.eBookPrice}
          discount={data!.discount}
          unit={data!.unit}
        />
      </>
    );
  }
}

function DetailsIndexLoadingComponent() {
  return (
    <>
      <SearchSection />
      <FixedDetailsTabList />
      <GNB />
      <div className={cn("details-single-book", "loading")}>
        <Spinner text="데이터를 불러오는 중 입니다" />
      </div>
    </>
  );
}
