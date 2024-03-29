import { useRecoilValue } from "recoil";
import { SearchSection } from "../../_components";
import GNB from "../_components/GNB";
import UserProfile from "../_components/UserProfile";
import ReviewLogsTable from "./_components/ReviewLogsTable";
import UserEdit from "../@modal/userEdit/UserEdit";

import { editUserModal } from "../../../recoil/modal/edit-user";

export default function MyRoomReview() {
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
            <ReviewLogsTable />
          </section>
        </div>
        {editShow && <UserEdit />}
      </main>
    </>
  );
}
