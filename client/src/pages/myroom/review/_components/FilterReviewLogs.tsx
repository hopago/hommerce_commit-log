import { useRecoilState } from "recoil";
import {
  ReviewFilterOption,
  reviewFilterState,
} from "../../../../recoil/pagination/search/filter/filter";
import { reviewSortState } from "../../../../recoil/pagination/search/sort/sort";
import { reviewSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { reviewEnabledState } from "../../../../recoil/pagination/enabled/enabled";

import { useFilter } from "../../hooks/use-filter";

import SelectList from "../../_components/SelectList";
import Input from "../../../join/_components/Input";
import Button from "../../../../_components/common/Button";

export default function FilterReviewLogs() {
  const filterOptions: ReviewFilterOption[] = [
    "검색 옵션",
    "리뷰 내용",
    "책 제목",
  ];

  const [sortState, setSortState] = useRecoilState(reviewSortState);
  const [filterState, setFilterState] = useRecoilState(reviewFilterState);
  const [searchTermState, setSearchTermState] = useRecoilState(
    reviewSearchTermState
  );
  const [enabled, setEnabled] = useRecoilState(reviewEnabledState);

  const resetSearchState = () => {
    setSortState("최신순");
    setFilterState("검색 옵션");
    setSearchTermState("");
    setEnabled(true);
  };

  const props = {
    sortState,
    setSortState,
    filterState,
    setFilterState,
    searchTermState,
    setSearchTermState,
    enabledState: enabled,
    setEnabledState: setEnabled,
    resetSearchState,
  };

  const {
    filter,
    setFilter,
    show,
    setShow,
    toggleShow,
    searchTerm,
    handleSearch,
    handleSubmit,
  } = useFilter<ReviewFilterOption>(props);

  return (
    <div className="filter">
      <h1 className="filter-title">검색 옵션 설정</h1>
      <form className="filter-options" onSubmit={handleSubmit}>
        <SelectList
          selectList={filterOptions}
          currSelect={filter}
          handleItemClick={setFilter}
          className="point-log"
          show={show}
          setShow={setShow}
          handleShow={toggleShow}
        />
        <Input
          type="text"
          value={searchTerm}
          placeholder="검색어를 입력해주세요."
          onChange={handleSearch}
          className="point-log"
        />
        <Button type="submit" text="검색하기" />
      </form>
    </div>
  );
}
