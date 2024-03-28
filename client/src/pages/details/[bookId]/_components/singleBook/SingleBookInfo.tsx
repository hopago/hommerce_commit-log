import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { getFullDate } from "../../../../../utils/create-formatted-date";
import ReviewTotalShortcut from "../review/ReviewTotalShortcut";
import { useHandleError } from "../../../../hooks/use-handle-error";

type SingleBookInfoProps = {
  title: string;
  author: string;
  publisher: string;
  bookId: string;
  createdAt: Date;
};

export default function SingleBookInfo({
  title,
  author,
  publisher,
  bookId,
  createdAt,
}: SingleBookInfoProps) {
  const { data, isSuccess, error, isError } = useQuery({
    queryKey: [QueryKeys.REVIEW_TOTAL, bookId],
    queryFn: () => QueryFns.GET_REVIEW_TOTAL_BY_BOOK_ID({ bookId: bookId }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!bookId,
  });

  useHandleError({ error, isError, fieldName: "리뷰" });

  if (isSuccess && data.reviewsLength > 0) {
    return (
      <div className="details-single-book__horizontal__book-info">
        <span className="title">{title}</span>
        <p>{author}</p>
        <div className="publish">
          <span>{publisher}</span>&nbsp;·&nbsp;
          <span>{getFullDate(createdAt)}</span>
        </div>
        <ReviewTotalShortcut data={data} />
      </div>
    );
  }
}
