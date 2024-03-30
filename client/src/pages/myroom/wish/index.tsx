import { useRecoilValue } from "recoil";
import { editUserModal } from "../../../recoil/modal/edit-user";
import { searchWishList } from "../../../recoil/modal/search-book";

import { useUser } from "@clerk/clerk-react";

import { toast } from "sonner";

import { SearchSection } from "../../_components";
import UserProfile from "../_components/UserProfile";
import GNB from "../_components/GNB";
import UserEdit from "../@modal/userEdit/UserEdit";
import WishListContainer from "./_components/WishListContainer";
import SearchWishListModalIndex from "./@modal";

export default function MyRoomWishListIndex() {
  const editShow = useRecoilValue(editUserModal);
  const searchShow = useRecoilValue(searchWishList);

  const { user } = useUser();

  if (!user) {
    toast.info(
      "유저 정보를 불러오던 중 문제가 생겼어요.\n새로고침 이후 이용가능 합니다."
    );
  }

  if (user) {
    return (
      <>
        <SearchSection />
        <main className="my-page">
          <div className="my-page__wrap">
            <aside>
              <UserProfile userId={user.id} />
              <GNB />
            </aside>
            <section>
              <WishListContainer userId={user.id} />
            </section>
          </div>
          {editShow && <UserEdit />}
          {searchShow && <SearchWishListModalIndex />}
        </main>
      </>
    );
  }
}
