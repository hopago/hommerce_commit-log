import { useMutation } from "@tanstack/react-query";
import { MutateFns } from "../../../../lib/react-query/mutateFn";
import { ServerError } from "../../../../fetcher/error";
import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../lib/react-query/query-key";

import { toast } from "sonner";

type GetSubscriptionLengthResponse = {
  docsLength: number;
};

export const useDeleteFavor = ({
  bookIds,
  userId,
}: {
  bookIds: string[];
  userId: string;
}) => {
  const { mutateAsync, isPending } = useMutation<
    | (
        | {
            deletedFavorId: string;
          }
        | undefined
      )[]
    | undefined,
    ServerError | Error,
    { userId: string; ids: string[] }
  >({
    mutationFn: ({ userId, ids }) =>
      MutateFns.DELETE_FAVOR_ITEM_BY_IDS(userId, ids),
    onSuccess: (response) => {
      if (response && Array.isArray(response)) {
        const queryClient = getQueryClient();

        queryClient.setQueryData<FavorItem[]>(
          [QueryKeys.USER_FAVOR_LIST, userId],
          []
        );
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.FAVOR_SUBSCRIPTION],
        });
        bookIds.forEach((bookId) => {
          queryClient.setQueryData(
            [QueryKeys.FAVOR_LENGTH, bookId],
            (prev: GetSubscriptionLengthResponse) => {
              if (prev) {
                return { docsLength: prev.docsLength - 1 };
              } else {
                return prev;
              }
            }
          );
        });
      }
    },
    onError: (error) => {
      if (error instanceof ServerError) {
        const { status } = error;

        if (status === 404) {
          toast.error("위시리스트를 찾지 못했습니다.");
        }

        if (status === 500) {
          toast.error("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        }
      } else if (error instanceof Error) {
        const { name, message } = error;

        toast.error(`${name}: ${message}`);
      } else {
        toast.error("예기치 못한 오류입니다.");
      }
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
