import trash from "../../../assets/ico_delete@2x.png";

import ReuseButton from "../../../_components/ReuseButton";

import { getQueryClient } from "../../../lib/react-query/getQueryClient";
import Button from "../../../_components/Button";

export default function RemoveAllCartItem() {
  const queryClient = getQueryClient();

  const onClick = () => {};

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
