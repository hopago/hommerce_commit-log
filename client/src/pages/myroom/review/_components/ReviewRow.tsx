import { TableRowSkeleton } from "../../point/_component/TableSkeleton";
import ReviewSelectCheckBox from "./ReviewSelectCheckBox";
import ReviewActions from "./ReviewActionsButton";

import { useUser } from "@clerk/clerk-react";

type ReviewRowProps = {
  review: ReviewLog;
  isLoading: boolean;
  userId: string;
};

export default function ReviewRow({
  review,
  isLoading,
  userId,
}: ReviewRowProps) {
  const { user } = useUser();

  if (isLoading) return <TableRowSkeleton />;

  return (
    <tr>
      <ReviewSelectCheckBox id={review._id} />
      <td>{user?.username}</td>
      <td>{review.bookTitle}</td>
      <td>{review.desc}</td>
      <ReviewActions id={review._id} bookId={review.bookId} userId={userId} />
    </tr>
  );
}
