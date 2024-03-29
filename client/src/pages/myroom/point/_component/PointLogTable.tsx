import { Suspense } from "react";
import { TableRowSkeleton } from "./TableSkeleton";
import { PointRowAsync } from "./PointTableRow";

type PointLogTableProps = {
  pointLogs: PointLogs;
  isLoading: boolean;
};

export default function PointLogTable({
  pointLogs,
  isLoading,
}: PointLogTableProps) {
  return (
    <div className="point-log-table">
      <div className="point-log-table__wrap">
        <table>
          <thead>
            <tr>
              <td>일자</td>
              <td>사유</td>
              <td>증감</td>
            </tr>
          </thead>
          <tbody>
            {pointLogs.map((point, i) => (
              <Suspense
                key={`${point._id}-${i}`}
                fallback={<TableRowSkeleton />}
              >
                <PointRowAsync point={point} isLoading={isLoading} />
              </Suspense>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
