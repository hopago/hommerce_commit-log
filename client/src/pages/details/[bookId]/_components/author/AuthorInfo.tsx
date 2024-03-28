import { useEffect } from "react";

import { MdArrowRight } from "react-icons/md";

import AuthorDetails from "./AuthorDetails";
import ReferrerAuthors, {
  ReferrerAuthorsLoadingComponent,
} from "../ReferrerAuthors";
import Spinner from "../../../../../_components/common/Spinner";
import NoContent from "../../../../../_components/NoContent";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";

import { useParams } from "react-router-dom";

type AuthorInfoProps = {
  authorName: string;
};

export default function AuthorInfo({ authorName }: AuthorInfoProps) {
  const { bookId } = useParams();

  const { data, isSuccess, isLoading, isError, error, isFetching, refetch } =
    useQuery({
      queryKey: [QueryKeys.AUTHOR, bookId],
      queryFn: () => QueryFns.GET_AUTHOR(authorName),
      staleTime: daysToMs(14),
      gcTime: daysToMs(17),
      enabled: !!authorName && !!bookId,
    });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (isFetching) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 1000);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isFetching]);

  useHandleError({ isError, error, errorDetails: ERROR_DETAILS.GET_AUTHOR });

  if (isLoading) return <LoadingComponent />;

  if (isSuccess && Array.isArray(data) && !data.length)
    return <NoContentComponent />;

  if (isSuccess && data) {
    return (
      <div className="details-author-info">
        <div className="details-author-info__horizontal">
          <AuthorDetails author={data[0]} />
          <ReferrerAuthors authorJob={data[0].job} />
        </div>
      </div>
    );
  }
}

function LoadingComponent() {
  return (
    <div className="details-author-info">
      <div className="details-author-info__horizontal">
        <div className="details-author-info__horizontal__contents">
          <h1>작가정보</h1>
          <div
            className="details-author-info__horizontal__contents__inner"
            style={{ width: "864px", height: "448px" }}
          >
            <Spinner text="작가 정보가 아직 등록되지 않았습니다" />
          </div>
        </div>
        <ReferrerAuthorsLoadingComponent />
      </div>
    </div>
  );
}

function NoContentComponent() {
  return (
    <div className="details-author-info">
      <div className="details-author-info__horizontal">
        <div className="details-author-info__horizontal__contents">
          <h1>작가정보</h1>
          <div
            className="details-author-info__horizontal__contents__inner"
            style={{ width: "864px", height: "448px" }}
          >
            <NoContent text="작가 정보가 아직 준비되지 않았어요" />
          </div>
        </div>
        <div className="details-author-info__horizontal__ref-authors">
          <div className="details-author-info__horizontal__ref-authors__col">
            <div className="details-author-info__horizontal__ref-authors__col__heading">
              <h1>이 분야의 베스트</h1>
              <button>
                <span>더보기</span>
                <div className="icon-wrap">
                  <MdArrowRight />
                </div>
              </button>
            </div>
            <ul>
              <NoContent text="작가 정보가 아직 준비되지 않았어요" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
