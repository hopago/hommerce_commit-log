import { useUser } from "@clerk/clerk-react";
import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { IUser } from "../../../../types/api/user";

import { useUpdateUser } from "./hooks/use-update-user";

import ReuseButton from "../../../../_components/common/ReuseButton";

import { FaCamera } from "react-icons/fa";

import { useSetRecoilState } from "recoil";
import { editUserModal } from "../../../../recoil/modal/edit-user";
import { MdClose } from "react-icons/md";

export default function UserEdit() {
  const { user: clerkUser } = useUser();
  const queryClient = getQueryClient();
  const dbUser = queryClient.getQueryData<IUser>([
    QueryKeys.USER,
    clerkUser?.id,
  ]);

  const {
    isPending,
    onChangeFile,
    onChangeUsername,
    handleChangeUsername,
    localUsername,
  } = useUpdateUser({ username: dbUser?.username! });

  const setEditShow = useSetRecoilState(editUserModal);

  if (dbUser && clerkUser) {
    return (
      <div className="user-edit-modal">
        <div className="bg-fill" />
        <div className="user-edit">
          <div className="user-edit__wrap">
            <div className="user-edit__wrap__header">
              <h1>프로필 정보 수정</h1>
            </div>
            <div className="user-edit__wrap__header__user-image">
              <img src={dbUser.imageUrl} alt={dbUser.username} />
              <label id="user-imageUrl" className="update-image">
                <div className="upload-label">
                  <FaCamera size={24} />
                  <span>이미지 변경</span>
                </div>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={onChangeFile}
                />
              </label>
            </div>
            <div className="user-edit__wrap__header__username">
              <label>유저명</label>
              <input
                type="text"
                value={localUsername}
                onChange={onChangeUsername}
              />
              <ReuseButton
                type="button"
                text="저장"
                style="purple"
                size="md"
                onClick={handleChangeUsername as any}
                disabled={isPending}
              />
            </div>
          </div>
        </div>
        <button onClick={() => setEditShow(false)}>
          <MdClose size={24} />
        </button>
      </div>
    );
  }
}
