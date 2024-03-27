import { useRecoilState, useSetRecoilState } from "recoil";
import { currentPageState } from "../../../../recoil/paginate";
import { detailsPageEnabled } from "../../../../recoil/api/details-page-review-enabled";

import { PAGE_SIZE } from "../../../constants/page";

import PrevPage from "./PrevPage";
import SetPage from "./SetPage";
import MoveToLastPage from "./MoveToLastPage";
import NextPage from "./NextPage";
import MoveToFirstPage from "./MoveToFirstPage";

import { useEffect } from "react";

type PaginateControlProps = {
  pageTotal: number;
};

export default function PaginateControl({ pageTotal }: PaginateControlProps) {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const setShouldRefetch = useSetRecoilState(detailsPageEnabled);

  const prevPageDisabled = currentPage === 1;
  const nextPageDisabled = currentPage === pageTotal;

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    setShouldRefetch(true);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < pageTotal ? prevPage + 1 : prevPage
    );
    setShouldRefetch(true);
  };

  const handleSetPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setShouldRefetch(true);
  };

  const handleMoveToFirstPage = () => {
    setCurrentPage(1);
    setShouldRefetch(true);
  };
  const handleMoveToLastPage = () => {
    setCurrentPage(pageTotal);
    setShouldRefetch(true);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

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
      <NextPage onNextPage={handleNextPage} disabled={nextPageDisabled} />
    </div>
  );
}
