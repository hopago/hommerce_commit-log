import GNB from "./_components/GNB";
import MyPointLogsCard from "./_components/MyPointLogsCard";
import MyWishListCard from "./_components/MyWishListCard";
import UserProfile from "./_components/UserProfile";

import { useRecoilValue } from "recoil";
import { editUserModal } from "../../recoil/modal/edit-user";
import UserEdit from "./@modal/userEdit/UserEdit";
import { SearchSection } from "../_components";

/* 
TODO: 작성한 리뷰 ( 일괄 삭제, 책 + 페이지 이동 ), 
찜 리스트 보기 ( 선택, 삭제 + 페이지 이동 ) 
*/
export default function MyRoomIndex() {
  const editShow = useRecoilValue(editUserModal);

  return (
    <>
      <SearchSection />
      <main className="my-page">
        <div className="my-page__wrap">
          <aside>
            <UserProfile />
            <GNB />
          </aside>
          <section>
            <MyPointLogsCard />
            <MyWishListCard />
          </section>
        </div>
        {editShow && <UserEdit />}
      </main>
    </>
  );
}
