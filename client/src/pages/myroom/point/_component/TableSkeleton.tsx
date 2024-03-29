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
    <Skeleton className="skeleton title" />
    <div className="data-table-filter-skeleton__options">
      <Skeleton className="skeleton select" />
      <Skeleton className="skeleton input" />
      <Skeleton className="skeleton button" />
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
              <Skeleton className="skeleton td" />
            </td>
            <td>
              <Skeleton className="skeleton td" />
            </td>
            <td>
              <Skeleton className="skeleton td" />
            </td>
            <td>
              <Skeleton className="skeleton td" />
            </td>
          </tr>
        </thead>
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </table>
    </div>
  </div>
);

export const SortDataButtonSkeleton = () => (
  <div className="data-table-sort-button-skeleton">
    <Skeleton className="skeleton title" />
    <Skeleton className="skeleton select" />
  </div>
);

export const TableRowSkeleton = () => {
  return (
    <tr>
      <ReviewSelectCheckBoxSkeleton />
      <td>
        <Skeleton className="skeleton td" />
      </td>
      <td>
        <Skeleton className="skeleton td" />
      </td>
      <td>
        <Skeleton className="skeleton td" />
      </td>
      <ReviewActionsSkeleton />
    </tr>
  );
};

export const ReviewSelectCheckBoxSkeleton = () => {
  return (
    <td>
      <Skeleton className="skeleton td" />
    </td>
  );
};

export const ReviewActionsSkeleton = () => {
  return (
    <td>
      <Skeleton className="skeleton td-icon" />
    </td>
  );
};
