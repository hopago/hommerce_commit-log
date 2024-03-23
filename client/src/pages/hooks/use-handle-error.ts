import { useEffect } from "react";

import { ServerError } from "../../fetcher/error";

import { toast } from "sonner";
import { handleError } from "../../fetcher/handle-error";

type CustomizeError = {
  error: Error | null;
  isError: boolean;
  isRefetchError?: boolean;
  errorDetails?: {
    code: number;
    message: string;
  }[];
};

export const useHandleError = ({
  error,
  isError,
  isRefetchError,
  errorDetails = [
    {
      code: 500,
      message: "서버 에러입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
}: CustomizeError) => {
  useEffect(() => {
    if (!isError || !error) return;

    if ((isError && error) || (isRefetchError && error)) {
      if (error instanceof ServerError) {
        toast.error(handleError({ error, errorDetails }));
      }
    }
  }, [isError, isRefetchError]);
};
