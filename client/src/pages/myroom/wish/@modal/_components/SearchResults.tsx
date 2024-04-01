import NoContent from "../../../../../_components/NoContent";
import Spinner from "../../../../../_components/common/Spinner";
import PaginateControl from "../../../../details/[bookId]/_components/PaginateControl";
import ResultItem from "./ResultItem";

type SearchResultsProps = {
  results: BookData | undefined;
  isLoading: boolean;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: (pageTotal: number) => void;
  handleSetPage: (pageNum: number) => void;
  handleMoveToFirstPage: () => void;
  handleMoveToLastPage: (pageTotal: number) => void;
};

export default function SearchResults({
  results,
  isLoading,
  currentPage,
  handleMoveToFirstPage,
  handleMoveToLastPage,
  handleNextPage,
  handlePrevPage,
  handleSetPage,
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
      {results?.pagination && results?.pagination?.totalPages > 1 && (
        <PaginateControl
          pageTotal={results?.pagination.totalPages}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleSetPage={handleSetPage}
          handleMoveToFirstPage={handleMoveToFirstPage}
          handleMoveToLastPage={handleMoveToLastPage}
        />
      )}
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
