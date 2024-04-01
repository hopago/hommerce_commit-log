type MoveToLastPageProps = {
  handleMoveToLastPage: (pageTotal: number) => void;
  pageTotal: number;
};

export default function MoveToLastPage({
  handleMoveToLastPage,
  pageTotal,
}: MoveToLastPageProps) {
  return (
    <button
      type="button"
      className="reviews-pagination__page-num"
      onClick={() => handleMoveToLastPage(pageTotal)}
    >
      <span>{pageTotal}</span>
    </button>
  );
}
