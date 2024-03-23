import pencil from "../../../../assets/ico_pencil.png";

import { useModal } from "../../../hooks/use-modal";

import PostReview from "./review/@modal/post-review";

import { useRecoilState } from "recoil";
import { postReviewModal } from "../../../../recoil/modal/post-review";

type PostReviewButtonProps = {
  hasNoReview?: boolean;
};

export default function PostReviewButton({
  hasNoReview,
}: PostReviewButtonProps) {
  const [show, setShow] = useRecoilState(postReviewModal);

  useModal({ show, setShow });

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
      {show && <PostReview setShow={setShow} hasNoReview={hasNoReview} />}
    </>
  );
}
