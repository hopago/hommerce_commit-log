import { ServerError } from "../../../../fetcher/error";
import { restFetcher } from "../../../../fetcher/restFetcher";
import { postError } from "../../../services/postError";

export const increaseView = async (bookId: string) => {
  const path = `/book/d/${bookId}`;

  try {
    await restFetcher({
      method: "PATCH",
      path,
    });
  } catch (err) {
    if (err instanceof Error || err instanceof ServerError) {
      postError(err);
    }
  }
};
