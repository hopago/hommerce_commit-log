import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";

type SingleBookInfoProps = {
  title: string;
  author: string;
  publisher: string;
  bookId: string;
};

export default function SingleBookInfo({
  title,
  author,
  publisher,
  bookId,
}: SingleBookInfoProps) {
  const { data, isSuccess, error } = useQuery({
    queryKey: [QueryKeys.REVIEW_TOTAL, bookId],
    queryFn: () => QueryFns.GET_REVIEW_TOTAL_BY_BOOK_ID({ bookId: bookId }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!bookId,
  });

  return (
    <div className="details-single-book__horizontal__book-info">
      <span className="title">{title}</span>
      <p>{author}</p>
      <div className="publish">
        <span>{publisher}</span>&nbsp;·&nbsp;<span>2023년 09월 07일</span>
      </div>
      {/* TODO: REVIEW */}
    </div>
  );
}
