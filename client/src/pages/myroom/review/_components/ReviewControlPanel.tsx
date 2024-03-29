import { useRecoilState } from "recoil";
import { reviewSortState } from "../../../../recoil/pagination/search/sort/sort";
import { useFilter } from "../../hooks/use-filter";
import { reviewFilterState } from "../../../../recoil/pagination/search/filter/filter";
import { reviewSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { reviewEnabledState } from "../../../../recoil/pagination/enabled/enabled";
import Button from "../../../../_components/common/Button";
import useSelectReview from "../../../../recoil/pagination/select-item/selected-item";
import SortReview from "./SortReview";
import { useDeleteUserReview } from "../hooks/use-update-user-review";

export type SortOption = "최신순" | "오래된순";

type DeleteReviewProps = { ids: string[]; userId: string; bookIds: string[] };

type ReviewControlPanelProps = {
  dataLength: number;
  userId: string;
  bookIds: string[];
};

export default function ReviewControlPanel({
  dataLength,
  userId,
  bookIds,
}: ReviewControlPanelProps) {
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

  const { sort, handleSort, show, toggleShow, setShow } = useFilter(props);
  const { selectedIds } = useSelectReview();

  const renderPanel = selectedIds.length ? (
    <DeleteReview ids={selectedIds} userId={userId} bookIds={bookIds} />
  ) : (
    <SortReview
      dataLength={dataLength}
      sort={sort}
      handleSort={handleSort}
      show={show}
      toggleShow={toggleShow}
      setShow={setShow}
    />
  );

  return renderPanel;
}

const DeleteReview = ({ ids, userId, bookIds }: DeleteReviewProps) => {
  const { mutate, isPending } = useDeleteUserReview({ userId, bookIds });

  const onClick = () => {
    const isConfirmed = confirm("정말 모든 리뷰를 삭제하시겠어요?");

    if (isConfirmed) {
      mutate(ids);
    }
  };

  return (
    <div className="review-control-panel">
      <h1 className="title">{ids.length}개 선택됨</h1>
      <Button
        type="button"
        text="일괄삭제"
        backgroundColor="#E8422F"
        border="none"
        onClick={onClick}
        disabled={isPending}
      />
    </div>
  );
};
