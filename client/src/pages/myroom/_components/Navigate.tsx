import { useNavigate } from "react-router-dom";

import Button from "../../../_components/common/Button";

export function Navigate({ path, text }: { path: string; text: string }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${path}`);
  };

  return (
    <Button
      type="button"
      text={text}
      onClick={onClick}
      ariaLabel="상세 보기"
      className="review-action"
    />
  );
}
