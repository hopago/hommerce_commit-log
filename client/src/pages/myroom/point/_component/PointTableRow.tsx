import React from "react";

import { TableRowSkeleton } from "./TableSkeleton";

import { formatDate } from "../../../../utils/create-formatted-date";

import { cn } from "../../../../lib/utils";

type PointRowProps = {
  point: PointLog;
  isLoading: boolean;
};

export const PointRowAsync = React.lazy(() => import("./PointTableRow"));

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
