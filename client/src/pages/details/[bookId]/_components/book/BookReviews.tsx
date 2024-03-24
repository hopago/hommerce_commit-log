import { forwardRef, useEffect, useState } from "react";

import { useSession } from "@clerk/clerk-react";

import noResult from "../../../../../assets/ico_info.png";

import CommonTooltip, {
  CommonToolTipItem,
} from "../../../../../_components/CommonTooltip";
import ReviewsTotalRating from "../review/ReviewsTotalRating";
import ReviewsKeywords from "../review/ReviewsKeywords";

import { MdInfoOutline } from "react-icons/md";

import ReviewsDetails from "../review/ReviewsDetails";
import { useQuery } from "@tanstack/react-query";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";

import PostReviewButton from "../PostReviewButton";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { useRecoilState } from "recoil";
import { postReviewModal } from "../../../../../recoil/modal/post-review";
import { useModal } from "../../../../hooks/use-modal";
import PostReview from "../review/@modal/post-review";

type BookReviewProps = {
  bookId: string | undefined;
};

const tooltipItems: CommonToolTipItem[] = [
  {
    title: "리워드 안내",
    desc: "구매 후 90일 이내에 평점 작성 시 e교환권 100원을 적립해드립니다.",
  },
  {
    title: "운영 원칙 안내",
    desc: "자유로운 의사 표현의 공간인 만큼 타인에 대한 배려를 부탁합니다. 일부 타인의 권리를 침해하거나 불편을 끼친다면 별도의 통보 없이 삭제될 수 있습니다.",
  },
];

const BookReviews = forwardRef<HTMLDivElement, BookReviewProps>(
  ({ bookId }, ref) => {
    const { isSignedIn } = useSession();

    const [show, setShow] = useState(false);
    const [postReviewModalShow, setPostReviewModalShow] =
      useRecoilState(postReviewModal);

    const handleTooltip = () => {
      setShow((prev) => !prev);
    };

    const { data, isSuccess, error, isError } = useQuery({
      queryKey: [QueryKeys.REVIEW_LENGTH, bookId],
      queryFn: () => QueryFns.GET_REVIEW_LENGTH(bookId!),
      staleTime: daysToMs(1),
      gcTime: daysToMs(3),
      enabled: !!bookId,
    });

    useModal({ show, setShow });

    useHandleError({ error, isError });

    // no-content
    if (isSuccess && data && data.docsLength === 0) {
      return (
        <div id="prod-review" ref={ref} className="details-prod-reviews">
          <div className="details-prod-reviews__wrap">
            <div className="details-prod-reviews__wrap__heading">
              <div className="title-wrap" style={{ position: "relative" }}>
                <h1>리뷰({data.docsLength})</h1>
                <div className="icon-wrap" onClick={handleTooltip}>
                  <MdInfoOutline className="icon" />
                </div>
                {show && (
                  <CommonTooltip
                    items={tooltipItems}
                    show={show}
                    setShow={setShow}
                  />
                )}
              </div>
              {isSignedIn && <PostReviewButton />}
            </div>
            <div className="details-prod-reviews__wrap__reviews-total">
              <div className="details-prod-reviews__wrap__reviews-total__inner">
                <div className="no-content">
                  <img src={noResult} alt="no-result" />
                  <p>
                    작성된 리뷰가 아직 없습니다.
                    <br />첫 리뷰 작성시 100 포인트를 증정해드려요.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {postReviewModalShow && (
            <PostReview setShow={setPostReviewModalShow} hasNoReview={true} />
          )}
        </div>
      );
    }

    // TODO: 토탈 레이팅 패칭

    // data-exist
    if (isSuccess && data && data.docsLength > 0) {
      return (
        <div id="prod-review" ref={ref} className="details-prod-reviews">
          <div className="details-prod-reviews__wrap">
            <div className="details-prod-reviews__wrap__heading">
              <div className="title-wrap" style={{ position: "relative" }}>
                <h1>리뷰({data.docsLength})</h1>
                <div className="icon-wrap" onClick={handleTooltip}>
                  <MdInfoOutline className="icon" />
                </div>
                {show && (
                  <CommonTooltip
                    items={tooltipItems}
                    show={show}
                    setShow={setShow}
                  />
                )}
              </div>
              {isSignedIn && <PostReviewButton />}
            </div>
            <div className="details-prod-reviews__wrap__reviews-total">
              <div className="details-prod-reviews__wrap__reviews-total__inner">
                <ReviewsTotalRating bookId={bookId!} />
                <ReviewsKeywords bookId={bookId!} />
              </div>
            </div>
            <ReviewsDetails />
          </div>
          {postReviewModalShow && (
            <PostReview setShow={setPostReviewModalShow} />
          )}
        </div>
      );
    }
  }
);

export default BookReviews;
