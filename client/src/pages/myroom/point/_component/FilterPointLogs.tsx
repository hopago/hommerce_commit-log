import { useRecoilState } from "recoil";
import Button from "../../../../_components/common/BUtton";
import Input from "../../../../_components/common/Input";
import { pointSortState } from "../../../../recoil/pagination/search/sort/sort";
import { pointSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { pointFilterState } from "../../../../recoil/pagination/search/filter/filter";
import { useFilter } from "../../hooks/use-filter";
import { pointEnabledState } from "../../../../recoil/pagination/enabled/enabled";
import SelectList from "../../_components/SelectList";

export type PointFilterOption = "검색 옵션" | "지급 내용" | "지급량";

export default function FilterPointLogs() {
  const filterOptions: PointFilterOption[] = [
    "검색 옵션",
    "지급 내용",
    "지급량",
  ];

  const [sortState, setSortState] = useRecoilState(pointSortState);
  const [filterState, setFilterState] = useRecoilState(pointFilterState);
  const [searchTermState, setSearchTermState] =
    useRecoilState(pointSearchTermState);
  const [enabled, setEnabled] = useRecoilState(pointEnabledState);

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
  } = useFilter<PointFilterOption>(props);

  return (
    <div className="filter">
      <h1 className="filterTitle">검색 옵션 설정</h1>
      <form className="filterOptions" onSubmit={handleSubmit}>
        <SelectList
          selectList={filterOptions}
          currSelect={filter}
          handleItemClick={setFilter}
          className="filterReview"
          show={show}
          setShow={setShow}
          handleShow={toggleShow}
        />
        <Input
          type="text"
          value={searchTerm}
          placeholder="검색어를 입력해주세요."
          onChange={handleSearch}
          className="filterReview"
        />
        <Button type="button" text="초기화" />
      </form>
    </div>
  );
}
