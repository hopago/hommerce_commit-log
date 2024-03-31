import { ServerError } from "../../../../fetcher/error";
import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";
import { postError } from "../../../services/postError";

export const patchSeenBookCategory = async (
  category: BookSubCategory,
  userId: string
) => {
  const queryString = createQueryString({ category });

  try {
    await restFetcher<void>({
      method: "PATCH",
      path: `/user/d/book/${userId}?${queryString}`,
    });
  } catch (err) {
    if (err instanceof ServerError || err instanceof Error) {
      postError(err);
    }
  }
};
