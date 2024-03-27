import { useParams } from "react-router-dom";

import NewBookItem, { NewBookItemSkeleton } from "./NewBookItem";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../lib/react-query/utils";
import { useHandleError } from "../../../hooks/use-handle-error";
import NoContent from "../../../../_components/NoContent";

type NewBookListProps = {
  category: BookSubCategory;
};

export default function NewBookList({ category }: NewBookListProps) {
  const { lang, category: paramsCategory } = useParams<{
    lang: BookParentCategory;
    category: BookSubCategory | undefined;
  }>();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.NEW_BOOKS, category],
    queryFn: () =>
      QueryFns.FIND_TODAY_PICK<IBook[]>(
        "newbook",
        lang!,
        paramsCategory ?? category
      ),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!lang && !!category,
  });

  useHandleError({ isError, error, fieldName: "새로나온 책" });

  if (isLoading) return <NewBookListLoading />;

  if (isSuccess && data && !data.length) return <NewBookNoContent />;

  if (isSuccess && data && data.length > 0) {
    return (
      <div className="new-books__book-list">
        <ul>
          {data.map((book) => (
            <NewBookItem key={book._id} book={book} />
          ))}
        </ul>
      </div>
    );
  }
}

function NewBookListLoading() {
  return (
    <div className="new-books__book-list">
      <ul>
        {[...Array.from({ length: 6 })].map((_, i) => (
          <NewBookItemSkeleton key={i} />
        ))}
      </ul>
    </div>
  );
}

function NewBookNoContent() {
  return (
    <div className="new-books__book-list">
      <ul>
        <NoContent text="컨텐츠를 준비 중 이에요" />
      </ul>
    </div>
  );
}
