import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";

type GetUserPointLogProps = {
  userId: string;
  filter?: PointFilterOption;
  searchTerm?: string;
  pageNum: number;
  sort: "최신순" | "오래된순";
};

export type PointFilterOption = "검색 옵션" | "지급 내용" | "지급량";

const translateQueryValueToEn = (filter: PointFilterOption) => {
  const filterMap = {
    "검색 옵션": null,
    "지급 내용": "desc",
    지급량: "bookTitle",
  };

  return filterMap[filter] || null;
};

export const getUserPointLog = ({
  userId,
  filter,
  searchTerm,
  pageNum,
  sort = "최신순",
}: GetUserPointLogProps) => {
  let path = `/point/log/${userId}`;

  const sortQueryString = createQueryString({ sort });

  let filterQueryString: string | null = null;
  if (filter && translateQueryValueToEn(filter)) {
    filterQueryString = translateQueryValueToEn(filter);
    path += `?${filterQueryString}`;

    if (searchTerm && searchTerm.trim() !== "") {
      const keywordQueryString = createQueryString({ keyword: searchTerm });
      path += `&${keywordQueryString}`;
    }
    path += `&${sortQueryString}`;
  } else {
    path += `?${sortQueryString}`;
  }

  const pageNumQueryString = `pageNum=${pageNum}`;
  path += `&${pageNumQueryString}`;

  return restFetcher<PointLogsResponse>({
    method: "GET",
    path,
  });
};
