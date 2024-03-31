import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { ServerError } from "../../../../fetcher/error";
import { MutateFns } from "../../../../lib/react-query/mutateFn";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { toast } from "sonner";

type GetSubscriptionLengthResponse = {
  docsLength: number;
};

export const useAddFavor = ({
  userId,
  bookId,
}: {
  userId: string;
  bookId?: string | string[];
}) => {
  const queryClient = getQueryClient();
  const { mutate, isPending } = useMutation<
    FavorList | undefined,
    ServerError | Error,
    { userId: string; book: FavorItem }
  >({
    mutationFn: ({ userId, book }) =>
      MutateFns.PATCH_FAVOR_ITEM({ userId, book }),
    onSuccess: (favorList) => {
      if (favorList) {
        queryClient.setQueryData<FavorItem[]>(
          [QueryKeys.USER_FAVOR_LIST, userId],
          favorList.books
        );
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.FAVOR_SUBSCRIPTION],
        });
        if (Array.isArray(bookId) && bookId.length > 0) {
          bookId.forEach((bookId) => {
            queryClient.setQueryData(
              [QueryKeys.FAVOR_LENGTH, bookId],
              (prev: GetSubscriptionLengthResponse) => {
                if (prev) {
                  return { docsLength: prev.docsLength + 1 };
                } else {
                  return prev;
                }
              }
            );
          });
        } else if (typeof bookId === "string") {
          queryClient.setQueryData(
            [QueryKeys.FAVOR_LENGTH, bookId],
            (prev: GetSubscriptionLengthResponse) => {
              if (prev) {
                return { docsLength: prev.docsLength + 1 };
              } else {
                return prev;
              }
            }
          );
        }
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
    mutate,
    isPending,
  };
};
