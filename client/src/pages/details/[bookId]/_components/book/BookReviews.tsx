import { forwardRef, useEffect, useState } from "react";

import { useSession } from "@clerk/clerk-react";

import noResult from "../../../../../assets/ico_info.png";
import { MdInfoOutline } from "react-icons/md";
import { tooltipItems } from "../review/constants/review-tool-tip";

import { useQuery } from "@tanstack/react-query";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";

import { useHandleError } from "../../../../hooks/use-handle-error";
import { useRecoilState } from "recoil";
import { postReviewModal } from "../../../../../recoil/modal/post-review";
import { useModal } from "../../../../hooks/use-modal";

import CommonTooltip from "../../../../../_components/CommonTooltip";
import PostReviewButton from "../PostReviewButton";
import PostReview from "../review/@modal/post-review";
import ReviewsTotals from "../review/ReviewsTotals";
import ReviewsDetails from "../review/ReviewsDetails";

type BookReviewProps = {
  bookId: string | undefined;
};

const BookReviews = forwardRef<HTMLDivElement, BookReviewProps>(
  ({ bookId }, ref) => {
    const { isSignedIn } = useSession();

    const [show, setShow] = useState(false);
    const [postReviewModalShow, setPostReviewModalShow] =
      useRecoilState(postReviewModal);

    const handleTooltip = () => {
      setShow((prev) => !prev);
    };

    const { data, isSuccess, error, isError, isFetching, refetch } = useQuery({
      queryKey: [QueryKeys.REVIEW_LENGTH, bookId],
      queryFn: () => QueryFns.GET_REVIEW_LENGTH(bookId!),
      staleTime: daysToMs(1),
      gcTime: daysToMs(3),
      enabled: !!bookId,
    });

    useModal({ show, setShow });

    useEffect(() => {
      let timeoutId: NodeJS.Timeout | null = null;

      if (isFetching) {
        timeoutId = setTimeout(() => {
          refetch();
        }, 1000);
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [isFetching]);

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
              <ReviewsTotals bookId={bookId} />
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
