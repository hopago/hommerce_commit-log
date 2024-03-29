import { FaCheck } from "react-icons/fa";

import useSelectReview from "../../../../recoil/pagination/select-item/selected-item";

import Button from "../../../../_components/common/Button";

type ReviewSelectCheckBoxProps = {
  id: string;
};

export default function ReviewSelectCheckBox({
  id,
}: ReviewSelectCheckBoxProps) {
  const { selectedIds, toggleId } = useSelectReview();

  const onClick = () => {
    toggleId(id);
  };

  const isActive = selectedIds?.includes(id);

  return (
    <td>
      <Button
        type="button"
        icon={<FaCheck />}
        onClick={onClick}
        className="select-all"
        active={isActive}
      />
    </td>
  );
}
