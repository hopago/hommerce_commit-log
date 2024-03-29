import { Skeleton } from "@nextui-org/skeleton";

export const DataTableSkeleton = () => (
  <div className="data-table-skeleton">
    <div className="data-table-skeleton__wrap">
      <Skeleton className="skeleton title" />
      <FilterItemsSkeleton />
      <TableSkeleton />
    </div>
  </div>
);

export const FilterItemsSkeleton = () => (
  <div className="data-table-filter-skeleton">
    <Skeleton className="skeleton titleSkeleton" />
    <div className="data-table-filter-skeleton__options">
      <Skeleton className="skeleton selectSkeleton" />
      <Skeleton className="skeleton inputSkeleton" />
      <Skeleton className="skeleton buttonSkeleton" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="data-table-contents-skeleton">
    <div className="data-table-contents-skeleton__wrap">
      <SortDataButtonSkeleton />
      <table>
        <thead>
          <tr>
            <td>
              <Skeleton className="skeleton tdSkeleton" />
            </td>
            <td>
              <Skeleton className="skeleton tdSkeleton" />
            </td>
            <td>
              <Skeleton className="skeleton tdSkeleton" />
            </td>
            <td>
              <Skeleton className="skeleton tdSkeleton" />
            </td>
          </tr>
        </thead>
        <TableRowSkeleton />
        <div style={{ marginBottom: "48px" }} />
        <TableRowSkeleton />
        <div style={{ marginBottom: "48px" }} />
        <TableRowSkeleton />
        <div style={{ marginBottom: "48px" }} />
        <TableRowSkeleton />
      </table>
    </div>
  </div>
);

export const SortDataButtonSkeleton = () => (
  <div className="data-table-sort-button-skeleton">
    <Skeleton className="skeleton title" />
    <Skeleton className="skeleton selectSkeleton" />
  </div>
);

export const TableRowSkeleton = () => {
  return (
    <tr>
      <ReviewSelectCheckBoxSkeleton />
      <td>
        <Skeleton className="skeleton tdSkeleton" />
      </td>
      <td>
        <Skeleton className="skeleton tdSkeleton" />
      </td>
      <td>
        <Skeleton className="skeleton tdSkeleton" />
      </td>
      <ReviewActionsSkeleton />
    </tr>
  );
};

export const ReviewSelectCheckBoxSkeleton = () => {
  return (
    <td>
      <Skeleton className="skeleton tdButtonSkeleton" />
    </td>
  );
};

export const ReviewActionsSkeleton = () => {
  return (
    <td>
      <Skeleton className="skeleton tdIconSkeleton" />
    </td>
  );
};
