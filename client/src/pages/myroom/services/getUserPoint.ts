import { restFetcher } from "../../../fetcher/restFetcher";

export const getUserPoint = (userId: string) => {
  if (!userId) return;

  const path = `/point/${userId}`;

  return restFetcher<number>({
    method: "GET",
    path,
  });
};
