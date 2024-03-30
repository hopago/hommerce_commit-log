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
  return (
    <>
      <ul>
        {results?.books.map((book) => (
          <ResultItem key={book._id} book={book} />
        ))}
      </ul>
      <PaginateControl pageTotal={results?.pagination.totalPages ?? 0} />
    </>
  );
}
