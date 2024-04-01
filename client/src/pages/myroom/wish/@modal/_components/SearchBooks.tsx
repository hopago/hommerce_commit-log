import { useFilter } from "../../../hooks/use-filter";
import {
  BookFilterOption,
  BookSortOption,
  useDebouncedSearchFormWithFilter,
} from "../../hooks/use-search-form";
import usePagination from "../../../../hooks/use-pagination";

import { useRecoilState } from "recoil";
import { searchPageSortState } from "../../../../../recoil/pagination/search/sort/sort";
import { wishFilterState } from "../../../../../recoil/pagination/search/filter/filter";
import { myRoomSearchEnabledState } from "../../../../../recoil/pagination/enabled/enabled";

import { bookFilterOptions } from "../../../../constants/filter";
import { bookSortOptions } from "../../../../constants/sort";

import SearchForm from "./SearchForm";
import SearchSort from "./SearchSort";
import SearchResults from "./SearchResults";

export default function SearchBooks() {
  const [sortState, setSortState] = useRecoilState(searchPageSortState);
  const [filterState, setFilterState] = useRecoilState(wishFilterState);
  const {
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleSetPage,
    handleMoveToFirstPage,
    handleMoveToLastPage,
  } = usePagination();
  const [enabled, setEnabled] = useRecoilState(myRoomSearchEnabledState);
  const { searchTerm, handleChange, isLoading, searchResults } =
    useDebouncedSearchFormWithFilter({
      filter: filterState,
      sort: sortState,
      pageNum: currentPage,
    });

  const props = {
    sortState,
    setSortState,
    filterState,
    setFilterState,
    searchTerm,
    enabledState: enabled,
    setEnabledState: setEnabled,
  };

  const {
    show,
    setShow,
    toggleShow,
    sortShow,
    setSortShow,
    toggleSortShow,
    filter,
    setFilter,
    sort,
    handleSort,
    handleSubmit,
  } = useFilter<BookFilterOption, BookSortOption>(props);

  return (
    <div className="search-books">
      <SearchForm
        selectList={bookFilterOptions}
        currSelect={filter}
        handleItemClick={setFilter}
        show={show}
        setShow={setShow}
        handleShow={toggleShow}
        handleChange={handleChange}
        inputValue={searchTerm}
        handleSubmit={handleSubmit}
      />
      <SearchSort
        selectList={bookSortOptions}
        currSelect={sort}
        handleItemClick={handleSort}
        show={sortShow}
        setShow={setSortShow}
        handleShow={toggleSortShow}
        totalBooks={searchResults?.pagination.totalBooks}
      />
      <SearchResults
        isLoading={isLoading}
        results={searchResults}
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
