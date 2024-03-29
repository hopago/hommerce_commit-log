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

import { useEffect, useState } from "react";

import { MdEdit } from "react-icons/md";

export default function UserProfile({ userId }: { userId: string }) {
  const { user } = useUser();
  const { data, isLoading, isFetching, refetch, isSuccess, isError, error } =
    useQuery({
      queryKey: [QueryKeys.USER, userId],
      queryFn: () => getUser(userId),
      staleTime: daysToMs(1),
      gcTime: daysToMs(3),
      enabled: !!userId,
    });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (isFetching) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 3000);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isFetching]);

  useHandleError({ isError, error, fieldName: "회원 정보" });

  const [show, setShow] = useRecoilState(editUserModal);
  const [hoverShow, setHoverShow] = useState(false);

  useModal({ show, setShow });

  if (isLoading) return <UserProfileSkeleton />;

  return (
    <div
      className={cn("user-profile", (isLoading || isFetching) && "loading")}
      onMouseEnter={() => setHoverShow(true)}
      onMouseLeave={() => setHoverShow(false)}
    >
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
      {hoverShow && (
        <div className="hover-menu" onClick={() => setShow(true)}>
          <div className="hover-menu__wrap">
            <MdEdit size={24} className="icon" color="#fff" />
            <span>프로필 수정</span>
          </div>
        </div>
      )}
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
