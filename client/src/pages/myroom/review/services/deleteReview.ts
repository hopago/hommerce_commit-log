import { restFetcher } from "../../../../fetcher/restFetcher";

export const deleteReview = async (id: string) => {
  return restFetcher<string>({
    method: "DELETE",
    path: `/review?reviewId=${id}`,
  });
};
