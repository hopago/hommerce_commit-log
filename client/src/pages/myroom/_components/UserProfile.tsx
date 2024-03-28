import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { getUser } from "../services/getUser";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";

import Badge from "../../../_components/common/Badge";

import { Skeleton } from "@nextui-org/skeleton";
import { cn } from "../../../lib/utils";

import { useRecoilState } from "recoil";
import { editUserModal } from "../../../recoil/modal/edit-user";
import { useModal } from "../../hooks/use-modal";

export default function UserProfile() {
  const { user } = useUser();
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: [QueryKeys.USER, user?.id],
    queryFn: () => getUser(user?.id!),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!user,
  });

  useHandleError({ isError, error, fieldName: "회원 정보" });

  const [show, setShow] = useRecoilState(editUserModal);

  useModal({ show, setShow });

  if (isLoading) return <UserProfileSkeleton />;

  return (
    <div className={cn("user-profile", isLoading && "loading")}>
      <img src={user?.imageUrl} alt="user-image" className="user-image" />
      <div className="user-profile__info">
        <span className="username">{user?.username}님</span>
        {isSuccess && data && (
          <Badge
            text={data.grade}
            width={42}
            height={24}
            backgroundColor="#F89B06"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#fff"
          />
        )}
      </div>
    </div>
  );
}

export const UserProfileSkeleton = () => {
  return (
    <div className="user-profile">
      <Skeleton className="skeleton img" />
      <div className="user-profile__info">
        <div className="skeleton-gap">
          <Skeleton className="skeleton username" />
        </div>
        <Skeleton className="skeleton badge" />
      </div>
    </div>
  );
};
