import PaginateControl from "../../../details/[bookId]/_components/PaginateControl";

import { getPageTotal } from "../../../details/[bookId]/utils/getPageTotal";

import usePagination from "../../../hooks/use-pagination";
import { useSelectUI } from "../../hooks/use-select-ui";

import BookList from "../book/BookList";
import FilterInfo from "../filter/FilterInfo";
import SortBox from "../sort/SortBox";

type SearchContentsProps = {
  docsLength: number;
};

export default function SearchContents({ docsLength }: SearchContentsProps) {
  const { onClick, display } = useSelectUI();

  const pageTotal = getPageTotal(docsLength);

  const {
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleSetPage,
    handleMoveToFirstPage,
    handleMoveToLastPage,
  } = usePagination();

  return (
    <div className="search-contents__container">
      <SortBox onClick={onClick} display={display} docsLength={docsLength} />
      <FilterInfo />
      <BookList display={display} currentPage={currentPage} />
      <PaginateControl
        pageTotal={pageTotal}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleSetPage={handleSetPage}
        handleMoveToFirstPage={handleMoveToFirstPage}
        handleMoveToLastPage={handleMoveToLastPage}
      />
    </div>
  );
}
