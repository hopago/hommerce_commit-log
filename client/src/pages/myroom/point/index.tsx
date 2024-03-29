import { useRecoilValue } from "recoil";
import { editUserModal } from "../../../recoil/modal/edit-user";
import UserEdit from "../@modal/userEdit/UserEdit";

import UserProfile from "../_components/UserProfile";
import GNB from "../_components/GNB";
import PointLogsTable from "./_component/PointLogsTable";
import { SearchSection } from "../../_components";

export default function MyRoomPointLogIndex() {
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
            <PointLogsTable />
          </section>
        </div>
        {editShow && <UserEdit />}
      </main>
    </>
  );
}
