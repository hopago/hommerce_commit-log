import {
  QueryKey,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

import { FaSpinner } from "react-icons/fa";

import { toast } from "sonner";

import { getQueryClient } from "../../../lib/react-query/getQueryClient";

import { useHandleError } from "../../hooks/use-handle-error";

import Button from "../../../_components/common/Button";

type NoContentProps = {
  text?: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      PaginatedReviewResponse | PointLogsResponse | BookData | IBook[] | Error
    >
  >;
  error: Error | null;
  isRefetching: boolean;
  isRefetchError: boolean;
  queryKey: QueryKey;
  fieldName: string;
};

export function NoContent({
  text,
  refetch,
  error,
  isRefetching,
  isRefetchError,
  queryKey,
  fieldName,
}: NoContentProps) {
  const queryClient = getQueryClient();

  const handleRefetch = () => async () => {
    try {
      await queryClient.resetQueries({
        queryKey,
      });
    } catch (err) {
      toast.error("쿼리키를 처리하던 도중 오류가 발생했습니다.");
    }

    try {
      refetch();

      toast.message("데이터를 성공적으로 불러왔어요.");
    } catch (err) {
      toast.error("데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const onClick = isRefetchError
    ? () => window.location.reload()
    : handleRefetch();

  useHandleError({ error, isError: isRefetchError, fieldName });

  const buttonIcon = isRefetching ? (
    <FaSpinner className="spinner-icon" />
  ) : null;
  const buttonText = isRefetching
    ? null
    : isRefetchError
    ? "페이지 새로고침"
    : "새로고침";
  const bgColor = isRefetchError ? "#BF444A" : undefined;

  return (
    <div className="table-no-content">
      <div className="table-no-content__wrap">
        <span className="no-content-text">{text}</span>
        <Button
          type="button"
          text={buttonText}
          icon={buttonIcon}
          onClick={onClick}
          disabled={isRefetchError}
          backgroundColor={bgColor}
        />
      </div>
    </div>
  );
}
