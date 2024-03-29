import { toast } from "sonner";

import { useRecoilValue } from "recoil";
import { reviewFilterState } from "../../../../recoil/pagination/search/filter/filter";
import { reviewSortState } from "../../../../recoil/pagination/search/sort/sort";
import { reviewSearchTermState } from "../../../../recoil/pagination/search/keyword/searchTerm";
import { currentPageState } from "../../../../recoil/pagination/pageNum/paginate";

import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { ServerError } from "../../../../fetcher/error";
import { MutateFns } from "../../../../lib/react-query/mutateFn";
import { QueryKeys } from "../../../../lib/react-query/query-key";

export const useDeleteUserReview = ({
  userId,
  bookIds,
}: {
  userId: string;
  bookIds: string[];
}) => {
  const queryClient = getQueryClient();

  const filter = useRecoilValue(reviewFilterState);
  const sort = useRecoilValue(reviewSortState);
  const searchTerm = useRecoilValue(reviewSearchTermState);
  const currentPage = useRecoilValue(currentPageState);

  const { mutate, isPending } = useMutation<
    string[],
    ServerError | Error | unknown,
    string | string[]
  >({
    mutationFn: (ids: string[] | string) => MutateFns.DELETE_REVIEW_BY_IDS(ids),
    onSuccess: async (ids) => {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      const prevReviews = queryClient.getQueryData<ReviewLogs>([
        QueryKeys.USER_REVIEW,
        filter,
        searchTerm,
      ]);
      if (!prevReviews) {
        await queryClient.invalidateQueries({
          queryKey: [
            QueryKeys.USER_REVIEW,
            userId,
            sort,
            filter,
            searchTerm,
            currentPage,
          ],
        });
        return;
      }

      const filteredReviews = prevReviews.filter(
        (review) => !idsArray.includes(review._id)
      );

      queryClient.setQueryData(
        [QueryKeys.USER_REVIEW, filter, searchTerm],
        filteredReviews
      );

      // TODO: README
      bookIds.forEach((bookId) => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.REVIEW_TOTAL, bookId],
        });
      });
      bookIds.forEach((bookId) => {
        queryClient.setQueryData(
          [QueryKeys.REVIEW_LENGTH, bookId],
          (prevLength: { docsLength: number }) => {
            if (prevLength) {
              const { docsLength } = prevLength;

              if (docsLength > 0 && typeof docsLength === "number") {
                return {
                  docsLength: prevLength.docsLength - 1,
                };
              } else {
                return prevLength;
              }
            }
          }
        );
      });
      bookIds.forEach((bookId) => {
        queryClient.setQueryData(
          [QueryKeys.REVIEWS, bookId],
          (prevReviews: PaginatedReviewResponse) => {
            if (prevReviews) {
              const { reviews } = prevReviews;
              const filteredReviews = reviews.filter(
                (review) => !idsArray.includes(review._id)
              );
              return {
                ...prevReviews,
                reviews: filteredReviews,
              };
            }
          }
        );
      });
      queryClient.removeQueries({
        queryKey: [QueryKeys.REVIEW, userId],
      });

      toast.success("리뷰 삭제를 성공적으로 마쳤어요.");
    },
    onError: (err) => {
      if (err instanceof ServerError) {
        const { status } = err;

        if (status === 400) {
          toast.error("리뷰 아이디가 필요합니다.");
        }

        if (status === 404) {
          toast.error("리뷰를 찾지 못했습니다.");
        }

        if (status === 500) {
          toast.error("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        }
      } else if (err instanceof Error) {
        const { name, message } = err;

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
