import { useState } from "react";

import ReviewDesc from "./ReviewDesc";
import ReviewInfo from "./ReviewInfo";
import ReviewInteract from "./ReviewInteract";
import ReviewRepliesContainer from "./ReviewReplies";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { useHandleError } from "../../../../hooks/use-handle-error";

type ReviewItemProps = {
  review: IReview;
};

export default function ReviewItem({ review }: ReviewItemProps) {
  const [show, setShow] = useState(false);

  const { data, isError, error } = useQuery({
    queryKey: [QueryKeys.REVIEW_REPLY, review._id],
    queryFn: () => QueryFns.GET_REVIEW_REPLY(review._id),
    staleTime: daysToMs(7),
    gcTime: daysToMs(9),
    enabled: !!review._id,
  });

  useHandleError({ isError, error });

  return (
    <li className="review-list__item">
      <ReviewInfo
        reviewId={review._id}
        username={review.username!}
        buyWay={review.buyWay}
        createdAt={review.createdAt}
        rating={review.rating}
        keyword={review.keyword}
      />
      <ReviewDesc desc={review.desc} />
      <ReviewInteract
        reviewId={review._id}
        repliesLength={data?.length ?? 0}
        liked={review.liked}
        setShow={setShow}
      />
      {show && (
        <ReviewRepliesContainer
          replies={data}
          setShow={setShow}
          reviewId={review._id}
        />
      )}
    </li>
  );
}
