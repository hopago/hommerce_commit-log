import trash from "../../../assets/ico_delete@2x.png";

import Button from "../../../_components/Button";
import { getQueryClient } from "../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../lib/react-query/query-key";

import { useUser } from "@clerk/clerk-react";

export default function RemoveAllCartItem() {
  const queryClient = getQueryClient();
  const { user } = useUser();

  const onClick = () => {
    const initData = {
      userId: user?.id,
      books: [],
    };

    queryClient.setQueryData([QueryKeys.CART, user?.id], initData);
  };

  return (
    <Button
      className="delete"
      icon={trash}
      type="button"
      size="sm"
      onClick={onClick}
      isAuth={true}
    />
  );
}
