import { useRecoilValue } from "recoil";
import { SearchSection } from "../../_components";
import GNB from "../_components/GNB";
import UserProfile from "../_components/UserProfile";
import ReviewLogsTable from "./_components/ReviewLogsTable";
import UserEdit from "../@modal/userEdit/UserEdit";

import { editUserModal } from "../../../recoil/modal/edit-user";

import { useUser } from "@clerk/clerk-react";

import { toast } from "sonner";

export default function MyRoomReview() {
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
              <ReviewLogsTable userId={user.id} />
            </section>
          </div>
          {editShow && <UserEdit />}
        </main>
      </>
    );
  }
}
