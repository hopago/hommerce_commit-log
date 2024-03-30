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
    setSelectedItems((prevSelectedItems) => {
      const isExist = prevSelectedItems.some(
        (prev) => prev.bookId === item.bookId
      );

      if (isExist) {
        return prevSelectedItems.filter((prev) => prev.bookId !== item.bookId);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const setIsActive = (bookId: string) => {
    return selectedItems.some((item) => item.bookId === bookId);
  };

  const reversedFavorList = [...favorList].reverse();

  return (
    <div className="prod-list">
      <ul>
        {reversedFavorList.map((item) => (
          <li key={item.bookId}>
            <CheckButton
              onClick={() => handleSelectItem(item)}
              isActive={setIsActive(item.bookId)}
            />
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
