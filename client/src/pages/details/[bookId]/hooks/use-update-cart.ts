import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { ServerError } from "../../../../fetcher/error";
import { MutateFns } from "../../../../lib/react-query/mutateFn";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { useHandleError } from "../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../api/constants/errorDetails";
import { QueryFns } from "../../../../lib/react-query/queryFn";

type UseUpdateCartProps = {
  book?: IBook;
  userId: string | undefined;
  actionType: "add" | "remove";
  amount: number;
};

type UseUpdateCartOptionalParams = Partial<UseUpdateCartProps>;

export const useUpdateCart = ({
  book,
  userId,
  actionType,
  amount,
}: UseUpdateCartProps) => {
  const queryClient = getQueryClient();
  const { mutate, isPending, isError, error } = useMutation<
    ICart | undefined,
    ServerError | Error,
    UseUpdateCartOptionalParams
  >({
    mutationFn: ({ book: paramsBook }: UseUpdateCartOptionalParams) =>
      MutateFns.UPDATE_CART({
        bookId: paramsBook?._id ?? book?._id,
        userId: userId!,
        actionType,
        amount,
        title: paramsBook?.title ?? book?.title,
        author: paramsBook?.author ?? book?.author,
        img: paramsBook?.representImg ?? book?.representImg,
        price: paramsBook?.price ?? book?.price,
        unit: paramsBook?.unit ?? book?.unit,
      }),
    onSuccess: async (newCart: ICart | undefined) => {
      if (newCart) {
        const prevCart = queryClient.getQueryData([QueryKeys.CART]);
        if (prevCart) {
          queryClient.setQueryData([QueryKeys.CART], newCart);
        } else {
          await queryClient.prefetchQuery({
            queryKey: [QueryKeys.CART],
            queryFn: () => QueryFns.GET_CART(userId!),
            staleTime: Infinity,
            gcTime: Infinity,
          });
        }
      }
    },
  });

  const handlePatch = async (
    book?: IBook,
    userId?: string,
    actionType?: "add" | "remove",
    amount?: number
  ) => {
    mutate({ book, userId, actionType, amount });
  };

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.PATCH_CART,
  });

  return {
    isPending,
    handlePatch,
  };
};
