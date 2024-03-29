import GNB from "./_components/GNB";
import MyPointLogsCard from "./_components/MyPointLogsCard";
import MyWishListCard from "./_components/MyWishListCard";
import UserProfile from "./_components/UserProfile";

import { useRecoilValue } from "recoil";
import { editUserModal } from "../../recoil/modal/edit-user";
import UserEdit from "./@modal/userEdit/UserEdit";
import { SearchSection } from "../_components";

import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

/* 
TODO: 찜 리스트 보기 ( 선택, 삭제 + 페이지 이동 ) 
*/
export default function MyRoomIndex() {
  const editShow = useRecoilValue(editUserModal);

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
              <MyPointLogsCard userId={user.id!} />
              <MyWishListCard userId={user.id!} />
            </section>
          </div>
          {editShow && <UserEdit />}
        </main>
      </>
    );
  }
}
