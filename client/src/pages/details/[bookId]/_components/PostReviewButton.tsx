import pencil from "../../../../assets/ico_pencil.png";

import { useSetRecoilState } from "recoil";
import { postReviewModal } from "../../../../recoil/modal/post-review";

export default function PostReviewButton() {
  const setShow = useSetRecoilState(postReviewModal);

  const onClick = () => {
    setShow(true);
  };

  return (
    <>
      <button onClick={onClick} className="prod-purchase-button sm purple">
        <img
          src={pencil}
          style={{ marginRight: "4px" }}
          alt="write-review-icon"
        />
        <span>리뷰 작성</span>
      </button>
    </>
  );
}
