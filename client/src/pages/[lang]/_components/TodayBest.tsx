import { MdArrowRight } from "react-icons/md";

import { useParams } from "react-router-dom";

import Heading from "./TodayPickHeading";
import ProdBooks from "./ProdBooks";
import OtherBooks, { OtherBooksSkeleton } from "./OtherBooks";
import { ProdBookItemSkeleton } from "./ProdBookItem";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";

export default function TodayBest() {
  const { lang } = useParams<{ lang: BookParentCategory }>();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.TODAY_BEST],
    queryFn: () =>
      QueryFns.FIND_TODAY_PICK<TodayBestResponse | undefined>(
        "todaybest",
        lang!
      ),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!lang,
  });

  useHandleError({ isError, error, fieldName: "일간 베스트" });

  if (isLoading) return <TodayBestLoading />;

  if (isSuccess && data && data.length > 1) {
    const prodBooks = data.slice(0, 2);
    const otherBooks = data.length > 3 ? data.slice(2, data.length) : null;
    const otherBooksTitle = otherBooks && otherBooks.map((book) => book.title);

    return (
      <div className="lang-page-picks__best__container">
        <div className="lang-page-picks__best__container__heading">
          <Heading title="일간 베스트" />
          <div className="more-vert">
            <span>더보기</span>
            <div className="icon-wrap">
              <MdArrowRight />
            </div>
          </div>
        </div>
        <div className="lang-page-picks__best__container__book-list">
          {prodBooks.length === 2 && <ProdBooks books={prodBooks} />}
          {otherBooksTitle && <OtherBooks books={otherBooksTitle} />}
        </div>
      </div>
    );
  }
}

function TodayBestLoading() {
  return (
    <div className="lang-page-picks__best__container">
      <div className="lang-page-picks__best__container__heading">
        <Heading title="일간 베스트" />
        <div className="more-vert">
          <span>더보기</span>
          <div className="icon-wrap">
            <MdArrowRight />
          </div>
        </div>
      </div>
      <div className="lang-page-picks__best__container__book-list">
        <div className="lang-page-picks__best__container__book-list__prod">
          <ul>
            <ProdBookItemSkeleton />
            <ProdBookItemSkeleton />
          </ul>
        </div>
        <OtherBooksSkeleton />
      </div>
    </div>
  );
}
