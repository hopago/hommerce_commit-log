import { useImageSlide } from "../../hooks/use-image-slide";

import { useQuery } from "@tanstack/react-query";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { useParams } from "react-router-dom";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";

import NextIcon from "../../_components/NextIcon";
import PrevIcon from "../../_components/PrevIcon";
import CurrentBook from "./CurrentBook";
import Preview from "./Preview";
import Heading from "./TodayPickHeading";
import NoContent from "../../../_components/NoContent";
import Spinner from "../../../_components/Spinner";

export default function TodayPick() {
  const { lang } = useParams<{ lang: BookParentCategory }>();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.TODAY_PICK],
    queryFn: () =>
      QueryFns.FIND_TODAY_PICK<TodayBestResponse | undefined>(
        "todaypicks",
        lang!
      ),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!lang,
  });

  const {
    setIndex,
    index,
    prevDisabled,
    handlePrev,
    nextDisabled,
    handleNext,
  } = useImageSlide({ total: data?.length!, preventNextNumber: 4 });

  const currentBook = data && data[index];

  useHandleError({ error, isError });

  if (isLoading) return <TodayPickLoading />;

  if (isSuccess && data && !data.length) return <TodayPickNoContent />;

  if (isSuccess && data && data.length > 0) {
    return (
      <div className="lang-page-picks__today__vertical">
        <Heading title="오늘의 선택" />
        {currentBook && <CurrentBook book={currentBook!} />}
        <Preview setCurrIndex={setIndex} currIndex={index} books={data} />
        <div className="lang-page-picks__today__vertical__slide-btn">
          <div className="process">
            <div className="fill" style={{ width: `${(index + 1) * 10}%` }} />
            <div className="bg" />
          </div>
          <PrevIcon prevDisabled={prevDisabled} handlePrev={handlePrev} />
          <NextIcon nextDisabled={nextDisabled} handleNext={handleNext} />
        </div>
      </div>
    );
  }
}

function TodayPickNoContent() {
  return (
    <div className="lang-page-picks__today__vertical">
      <Heading title="오늘의 선택" />
      <div className="lang-page-picks__today__vertical__preview">
        <NoContent text="컨텐츠가 아직 준비되지 않았어요" />
      </div>
    </div>
  );
}

function TodayPickLoading() {
  return (
    <div className="lang-page-picks__today__vertical">
      <Heading title="오늘의 선택" />
      <div className="lang-page-picks__today__vertical__preview">
        <Spinner text="컨텐츠를 불러오는 중 입니다" />
      </div>
    </div>
  );
}
