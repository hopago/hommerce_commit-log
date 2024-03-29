import { useQuery } from "@tanstack/react-query";
import { getUserPoint } from "../../services/getUserPoint";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { daysToMs } from "../../../../lib/react-query/utils";
import { useHandleError } from "../../../hooks/use-handle-error";

import { FaUser } from "react-icons/fa";

type UserPointProps = {
  userId: string;
};

export default function UserPoint({ userId }: UserPointProps) {
  const { data, error, isError } = useQuery({
    queryKey: [QueryKeys.POINT, userId],
    queryFn: () => getUserPoint(userId!),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!userId,
  });

  useHandleError({ error, isError, fieldName: "포인트" });

  return (
    <div className="user-point">
      <div className="user-point__wrap">
        <FaUser size={34} className="user-icon" />
        <div className="user-point-text">
          <h1>통합 포인트</h1>
          <span>{Number(data) ?? 0}&nbsp;P</span>
        </div>
      </div>
    </div>
  );
}
