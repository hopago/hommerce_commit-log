import { PAGE_SIZE } from "../../../constants/page";

import PrevPage from "./PrevPage";
import SetPage from "./SetPage";
import MoveToLastPage from "./MoveToLastPage";
import NextPage from "./NextPage";
import MoveToFirstPage from "./MoveToFirstPage";

type PaginateControlProps = {
  pageTotal: number | undefined;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: (pageTotal: number) => void;
  handleSetPage: (pageNum: number) => void;
  handleMoveToFirstPage: () => void;
  handleMoveToLastPage: (pageTotal: number) => void;
};

export default function PaginateControl({
  pageTotal,
  currentPage,
  handleMoveToFirstPage,
  handleMoveToLastPage,
  handleNextPage,
  handlePrevPage,
  handleSetPage,
}: PaginateControlProps) {
  const prevPageDisabled = currentPage === 1;
  const nextPageDisabled = currentPage === pageTotal;

  if (pageTotal) {
    return (
      <div className="reviews-pagination">
        <PrevPage onPrevPage={handlePrevPage} disabled={prevPageDisabled} />
        {currentPage > PAGE_SIZE && (
          <MoveToFirstPage handleMoveToFirstPage={handleMoveToFirstPage} />
        )}
        <SetPage
          currPage={currentPage}
          total={pageTotal}
          onSetPage={handleSetPage}
        />
        {pageTotal - PAGE_SIZE > currentPage && (
          <MoveToLastPage
            pageTotal={pageTotal}
            handleMoveToLastPage={handleMoveToLastPage}
          />
        )}
        <NextPage
          pageTotal={pageTotal}
          onNextPage={handleNextPage}
          disabled={nextPageDisabled}
        />
      </div>
    );
  }
}
