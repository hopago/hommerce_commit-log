import { useRecoilState } from "recoil";
import { selectedMyRoomWishListState } from "../../../../recoil/myroom/selected-item";

import CheckButton from "../../../../_components/common/CheckButton";
import WishItemActions from "./WishItemActions";
import { Link } from "react-router-dom";

type WishListProps = {
  favorList: FavorItem[];
};

export default function WishList({ favorList }: WishListProps) {
  const [selectedItems, setSelectedItems] = useRecoilState(
    selectedMyRoomWishListState
  );

  const handleSelectItem = (item: FavorItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div className="prod-list">
      <ul>
        {favorList.map((item) => (
          <li key={item.bookId}>
            <CheckButton onClick={handleSelectItem} />
            <Link to={`/details/${item.bookId}`} className="link">
              <img src={item.img} alt={item.title} />
            </Link>
            <div className="col">
              <Link to={`/details/${item.bookId}`} className="link">
                <h1>{item.title}</h1>
              </Link>
              <p>{item.author}</p>
            </div>
            <WishItemActions bookId={item.bookId} />
          </li>
        ))}
      </ul>
    </div>
  );
}
