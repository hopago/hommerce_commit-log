import NoContent from "../../../../../_components/NoContent";
import Spinner from "../../../../../_components/common/Spinner";
import PaginateControl from "../../../../details/[bookId]/_components/PaginateControl";
import ResultItem from "./ResultItem";

type SearchResultsProps = {
  results: BookData | undefined;
  isLoading: boolean;
};

export default function SearchResults({
  results,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) return <SearchResultsLoadingComponent />;

  if (!results || (Array.isArray(results.books) && !results.books.length))
    return <SearchResultsNoContent />;

  return (
    <div className="search-results">
      <ul>
        {results?.books.map((book) => (
          <ResultItem key={book._id} book={book} />
        ))}
      </ul>
      <PaginateControl pageTotal={results?.pagination.totalPages ?? 0} />
    </div>
  );
}

function SearchResultsLoadingComponent() {
  return (
    <div className="search-results">
      <ul>
        <Spinner text="검색 결과를 불러오는 중 입니다" />
      </ul>
    </div>
  );
}

function SearchResultsNoContent() {
  return (
    <div className="search-results">
      <ul>
        <NoContent text="검색 결과를 찾을 수 없습니다" />
      </ul>
    </div>
  );
}
