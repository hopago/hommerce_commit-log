import SelectList from "../../../_components/SelectList";
import { BookSortOption } from "../../hooks/use-search-form";

type SearchSortProps = {
  selectList: BookSortOption[];
  currSelect: BookSortOption;
  handleItemClick: (sort: BookSortOption) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleShow: () => void;
  totalBooks: number | undefined;
};

export default function SearchSort({
  selectList,
  currSelect,
  handleItemClick,
  show,
  setShow,
  handleShow,
  totalBooks,
}: SearchSortProps) {
  return (
    <div className="search-sort-container">
      <div className="search-sort-container__wrap">
        <h1>
          검색결과 <b>{totalBooks ? totalBooks.toLocaleString() : 0}</b>건
        </h1>
        <SelectList
          selectList={selectList}
          currSelect={currSelect}
          handleItemClick={handleItemClick}
          show={show}
          setShow={setShow}
          handleShow={handleShow}
          className="wish-list sort"
        />
      </div>
    </div>
  );
}
