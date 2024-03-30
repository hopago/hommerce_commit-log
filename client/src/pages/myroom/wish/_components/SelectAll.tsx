import CheckButton from "../../../../_components/common/CheckButton";

import { useRecoilState } from "recoil";
import { selectedMyRoomWishListState } from "../../../../recoil/myroom/selected-item";

type SelectAllProps = {
  favorList: FavorItem[];
};

export default function SelectAll({ favorList }: SelectAllProps) {
  const [selectedIds, setSelectedIds] = useRecoilState(
    selectedMyRoomWishListState
  );

  const onClick = () => {
    setSelectedIds(favorList);
  };

  const isActive = selectedIds.length === favorList.length;

  return (
    <div className="select-all-wrap">
      <CheckButton onClick={onClick} isActive={isActive} />
    </div>
  );
}
