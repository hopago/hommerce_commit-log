import WishList from "./WishList";
import WishListActionsButtons from "./WishListActionsButtons";

// TODO: 디바운스 검색 모달, 리스트 다량 삭제, 단일 삭제, UI
export default function WishListContainer() {
  return (
    <div className="wish-list-container">
      <WishListActionsButtons />
      <WishList />
    </div>
  );
}
