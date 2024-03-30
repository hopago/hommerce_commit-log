import { MdCheck } from "react-icons/md";

import Button from "../../../../../_components/common/Button";

import { formatDate } from "../../../../../utils/create-formatted-date";

import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { MutateFns } from "../../../../../lib/react-query/mutateFn";
import { useUser } from "@clerk/clerk-react";
import { getQueryClient } from "../../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";
import { QueryFns } from "../../../../../lib/react-query/queryFn";

type ResultItemProps = {
  book: IBook;
};

type GetSubscriptionLengthResponse = {
  docsLength: number;
};

// SORT 쿼리 백엔드 로직 업데이트, SEARCH PAGE에도 반영 -> 로딩 상태에 따라 WISH MODAL UI ->
// searchTerm 로직 filterEn 확인

export default function ResultItem({ book }: ResultItemProps) {
  const { user } = useUser();

  const { data: isSubscribed } = useQuery({
    queryKey: [QueryKeys.FAVOR_SUBSCRIPTION, book._id],
    queryFn: () =>
      QueryFns.GET_FAVOR_SUBSCRIPTION_IS_SUBSCRIBED({
        bookId: book._id,
        userId: user!.id,
      }),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: Boolean(user),
  });

  const { mutate, error, isError } = useMutation({
    mutationFn: () =>
      MutateFns.PATCH_FAVOR_ITEM({
        userId: user?.id!,
        book: {
          bookId: book._id,
          author: book.author,
          title: book.title,
          img: book.representImg,
        },
      }),
    onSuccess: (response: FavorList | undefined) => {
      const queryClient = getQueryClient();

      queryClient.setQueryData<FavorItem[]>(
        [QueryKeys.USER_FAVOR_LIST, user?.id],
        response?.books
      );

      queryClient.setQueryData<GetSubscriptionLengthResponse>(
        [QueryKeys.FAVOR_LENGTH, book._id],
        (prev: GetSubscriptionLengthResponse | undefined) => {
          if (prev) {
            return {
              ...prev,
              docsLength: prev.docsLength + 1,
            };
          } else {
            return prev;
          }
        }
      );
      queryClient.setQueryData(
        [QueryKeys.FAVOR_SUBSCRIPTION, book._id],
        (prev: boolean) => {
          if (prev === (undefined || null)) {
            return true;
          } else if (typeof prev === "boolean") {
            return !Boolean(isSubscribed);
          }
        }
      );
    },
  });

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.PATCH_FAVOR_ITEM,
  });

  const onClick = () => mutate();

  return (
    <li>
      <Link to={`/details/${book._id}`} className="link">
        <img src={book.representImg} alt={book.title} />
      </Link>
      <div className="flex-col">
        <Link to={`/details/${book._id}`} className="link">
          <h1>{book.title}</h1>
        </Link>
        <p>{book.author}</p>
        <p>{book.publisher}</p>
        <p>{formatDate(book.createdAt)}</p>
      </div>
      {isSubscribed ? (
        <Button
          type="button"
          className="wish-list-select"
          icon={<MdCheck />}
          text="삭제"
          onClick={onClick}
        />
      ) : (
        <Button
          type="button"
          className="wish-list-select"
          icon={<MdCheck />}
          text="선택"
          onClick={onClick}
        />
      )}
    </li>
  );
}
