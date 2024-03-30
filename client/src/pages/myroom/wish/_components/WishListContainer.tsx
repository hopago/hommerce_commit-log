import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import WishList from "./WishList";
import WishListActionsButtons from "./WishListActionsButtons";

// TODO: 디바운스 검색 모달, 리스트 다량 삭제, 단일 삭제, UI
export default function WishListContainer({ userId }: { userId: string }) {
  const queryClient = getQueryClient();
  const data = queryClient.getQueryData<FavorItem[]>([
    QueryKeys.USER_FAVOR_LIST,
    userId,
  ]);

  if (Array.isArray(data) && data.length > 0) {
    return (
      <div className="wish-list-container">
        <WishListActionsButtons favorList={data} />
        <WishList />
      </div>
    );
  }
}
