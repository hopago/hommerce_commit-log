import trash from "../../../assets/ico_delete@2x.png";

import { getQueryClient } from "../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../lib/react-query/query-key";

type SortHeaderProps = {
  length: number;
};

export default function SortHeader({ length }: SortHeaderProps) {
  const queryClient = getQueryClient();

  const onClick = () => {
    localStorage.removeItem("seenBookIds");
    queryClient.removeQueries({
      queryKey: [QueryKeys.SEEN_BOOK_LAST_ITEM],
    });
    queryClient.removeQueries({
      queryKey: [QueryKeys.SEEN_BOOKS],
    });
  };

  return (
    <div className="sort-list-header">
      <span>
        <span>{length}</span>건
      </span>
      <button onClick={onClick}>
        <img src={trash} alt="delete-icon" />
        <span>전체삭제</span>
      </button>
    </div>
  );
}
