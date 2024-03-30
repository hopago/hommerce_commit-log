import { MdPlusOne } from "react-icons/md";
import Button from "../../../../_components/common/Button";
import ReuseButton from "../../../../_components/common/CommonButton";
import { FaTrash } from "react-icons/fa";

export default function MutateWishList() {
  

  return (
    <div className="mutate-wish-list-wrap">
      <Button text="도서 추가" icon={<MdPlusOne />} type="button" />
      <ReuseButton
        style="default"
        text="삭제"
        icon={<FaTrash />}
        type="button"
        size="sm"
      />
    </div>
  );
}
