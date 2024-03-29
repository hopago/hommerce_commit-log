import React from "react";

import { TableRowSkeleton } from "../../point/_component/TableSkeleton";

type ReviewRowProps = {
  review: ReviewLog;
  isLoading: boolean;
  userId: string;
};

export const ReviewRowAsync = React.lazy(() => import("./ReviewTableRow"));

export default function ReviewRow({
  review,
  isLoading,
  userId,
}: ReviewRowProps) {
  if (isLoading) return <TableRowSkeleton />;

  return (
    <tr>
      <ReviewSelectedCheckBox id={review._id} />
      <td>{review._id}</td>
      <td>{review.bookTitle}</td>
      <td>{review.desc}</td>
      <ReviewActions id={review._id} userId={userId} />
    </tr>
  );
}
