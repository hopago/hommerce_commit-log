import { formatDate } from "../../../../../utils/create-formatted-date";
import { createScoreIcons } from "../../../../../utils/create-score-icons";

import {
  ReviewKeywords,
  ReviewRatingType,
} from "../../../../_components/types/review";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { postReviewModal } from "../../../../../recoil/modal/post-review";
import { isAlreadyPostReview } from "../../../../../recoil/edit-user-review";
import { useDeleteReview } from "./services/deleteReview";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

type ReviewInfoProps = {
  username: string;
  buyWay: SellWay;
  createdAt: string | Date;
  rating: ReviewRatingType;
  keyword: ReviewKeywords;
  reviewId: string;
};

type UserActionsControlProps = {
  isUserPosted: boolean;
  reviewId: string;
};

export default function ReviewInfo({
  username,
  buyWay,
  createdAt,
  rating,
  keyword,
  reviewId,
}: ReviewInfoProps) {
  const isUserPosted = useRecoilValue(isAlreadyPostReview);

  // TODO: isUserPosted시엔 수정 시엔 post모달에서 patch 함수 실행, 삭제 시엔 confirm 후에 삭제 진행

  return (
    <div className="review-list__item__review-info">
      <div className="review-list__item__review-info__left">
        <div className="info-badge">
          <span>{buyWay}</span>
        </div>
        <span>{username}</span>
        <div className="divider" />
        <span>{formatDate(createdAt)}</span>
        <div className="divider" />
        <UserActionsControls isUserPosted={isUserPosted} reviewId={reviewId} />
      </div>
      <div className="review-list__item__review-info__right">
        <div className="score-icons">{createScoreIcons(Number(rating))}</div>
        <div className="divider" />
        <span>{keyword}</span>
      </div>
    </div>
  );
}

function UserActionsControls({
  isUserPosted,
  reviewId,
}: UserActionsControlProps) {
  const { user } = useUser();
  const { bookId } = useParams<{ bookId: string }>();

  const setShow = useSetRecoilState(postReviewModal);

  const { execute: deleteReview } = useDeleteReview({
    userId: user?.id,
    bookId,
  });

  const handleEditClick = () => {
    setShow(true);
  };

  const handleReportClick = () => {
    // TODO: 신고 기능
  };

  const handleDeleteClick = () => {
    if (user) {
      deleteReview({ userId: user.id, reviewId });
    }
  };

  const handleBlockClick = () => {
    // TODO: 차단 기능 (filter)
  };

  return (
    <>
      <span
        className="report"
        onClick={isUserPosted ? handleEditClick : handleReportClick}
      >
        {isUserPosted ? "수정" : "신고"}
      </span>
      <span className="gap report" style={{ margin: "0 1px" }}>
        /
      </span>
      <span
        className="report"
        onClick={isUserPosted ? handleDeleteClick : handleBlockClick}
      >
        {isUserPosted ? "삭제" : "차단"}
      </span>
    </>
  );
}
