import { TableRowSkeleton } from "./TableSkeleton";

import { cn } from "../../../../lib/utils";
import { formatDate } from "../../../../utils/create-formatted-date";

type PointRowProps = {
  point: PointLog;
  isLoading: boolean;
};

export default function PointRow({ point, isLoading }: PointRowProps) {
  if (isLoading) return <TableRowSkeleton />;

  return (
    <tr>
      <td>{formatDate(point.createdAt)}</td>
      <td>{point.desc}</td>
      <td className={cn("", point.amount > 0 ? "inc" : "dec")}>
        {point.amount}
      </td>
    </tr>
  );
}
