import { FaCheck } from "react-icons/fa";

import { useEffect } from "react";

import useSelectReview from "../../../../recoil/pagination/select-item/selected-item";

import Button from "../../../../_components/common/Button";

type ReviewSelectAllCheckBoxProps = {
  ids: string[];
};

export default function ReviewSelectAllCheckBox({
  ids,
}: ReviewSelectAllCheckBoxProps) {
  const {
    selectedIds,
    isSelectedAll,
    totalLength,
    setIsSelectedAll,
    setTotalLength,
    toggleSelectAll,
  } = useSelectReview();

  const onClick = () => {
    toggleSelectAll(ids);
  };

  useEffect(() => {
    setTotalLength(ids.length);
  }, [ids]);

  useEffect(() => {
    if (selectedIds.length === totalLength) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [selectedIds.length, totalLength]);

  return (
    <>
      <Button
        type="button"
        icon={<FaCheck />}
        onClick={onClick}
        className="select-all"
        active={isSelectedAll}
      />
    </>
  );
}
