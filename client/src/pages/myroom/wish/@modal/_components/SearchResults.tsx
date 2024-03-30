type SearchResultsProps = {
  books: IBook[] | undefined;
  isLoading: boolean;
};

export default function SearchResults({
  books,
  isLoading,
}: SearchResultsProps) {
  return <div>SearchResults</div>;
}
