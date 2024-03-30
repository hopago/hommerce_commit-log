import CheckButton from "../../../../_components/common/CheckButton";

import { useRecoilState } from "recoil";
import { selectedMyRoomWishListState } from "../../../../recoil/myroom/selected-item";

type SelectAllProps = {
  favorList: FavorItem[];
};

export default function SelectAll({ favorList }: SelectAllProps) {
  const [selectedItems, setSelectedItems] = useRecoilState(
    selectedMyRoomWishListState
  );

  const onClick = () => {
    setSelectedItems(favorList);
  };

  const isActive = selectedItems.length === favorList.length;

  return (
    <div className="select-all-wrap">
      <CheckButton onClick={onClick} isActive={isActive} />
      <span>전체 선택</span>
    </div>
  );
}
