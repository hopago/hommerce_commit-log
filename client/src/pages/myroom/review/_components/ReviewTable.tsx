import { Suspense, useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { totalReviewIdsState } from "../../../../recoil/pagination/select-item/selected-item";

import ReviewControlPanel from "./ReviewControlPanel";
import ReviewSelectAllCheckBox from "./ReviewSelectAllCheckBox";

type ReviewLogTableProps = {
  reviews: ReviewLogs;
  dataLength: number;
  isLoading: boolean;
  userId: string;
};

export default function ReviewLogTable({
  reviews,
  dataLength,
  isLoading,
  userId,
}: ReviewLogTableProps) {
  const ids = reviews.map((review) => review._id);
  const setTotalReviewIds = useSetRecoilState(totalReviewIdsState);

  useEffect(() => {
    setTotalReviewIds(ids);
  }, [ids]);

  return (
    <div className="point-log-table review">
      <div className="point-log-table__wrap review">
        <ReviewControlPanel dataLength={dataLength} userId={userId} />
        <table>
          <thead>
            <tr>
              <ReviewSelectAllCheckBox ids={ids} />
              <td>리뷰 ID</td>
              <td>책 제목</td>
              <td>리뷰 내용</td>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <Suspense key={review._id} fallback={<TableRowSkeleton />}>
                <ReviewRowAsync
                  review={review}
                  isLoading={isLoading}
                  userId={userId}
                />
              </Suspense>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
