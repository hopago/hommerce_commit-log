import SelectList from "../../_components/SelectList";

export type ReviewSortOption = "최신순" | "오래된순";

type SortReviewProps = {
  dataLength: number;
  sort: ReviewSortOption;
  handleSort: (sort: ReviewSortOption) => void;
  show: boolean;
  toggleShow: () => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortReview = ({
  dataLength,
  sort,
  handleSort,
  show,
  toggleShow,
  setShow,
}: SortReviewProps) => {
  const selectList: ReviewSortOption[] = ["최신순", "오래된순"];

  return (
    <div className="review-control-panel">
      <h1 className="title">{dataLength.toLocaleString()}개의 도서</h1>
      <SelectList
        currSelect={sort}
        handleItemClick={handleSort}
        selectList={selectList}
        show={show}
        setShow={setShow}
        handleShow={toggleShow}
        className="review-sort"
        backgroundColor="#414B5D"
      />
    </div>
  );
};

export default SortReview;
