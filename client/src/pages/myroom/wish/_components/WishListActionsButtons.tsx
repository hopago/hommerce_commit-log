import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { myRoomWishListTotalIds } from "../../../../recoil/myroom/selected-item";

import MutateWishList from "./MutateWishList";
import SelectAll from "./SelectAll";

type WishListActionsButtonsProps = {
  favorList: FavorItem[];
};

export default function WishListActionsButtons({
  favorList,
}: WishListActionsButtonsProps) {
  const [totalIds, setTotalIds] = useRecoilState(myRoomWishListTotalIds);
  const bookIds = favorList.map(item => item.bookId);

  useEffect(() => {
    setTotalIds(favorList.map((list) => list.bookId));
  }, [favorList.length]);

  return (
    <div className="wish-list-container__actions">
      <div className="wish-list-container__actions__wrap">
        <SelectAll favorList={favorList} />
        <MutateWishList totalIds={totalIds} bookIds={bookIds} />
      </div>
    </div>
  );
}
