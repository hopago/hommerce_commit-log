import { restFetcher } from "../../fetcher/restFetcher";

export const postError = async (error: any) => {
  const sendErrorPath = `/client/error`;

  await restFetcher({
    method: "POST",
    path: sendErrorPath,
    body: error,
  });
};
