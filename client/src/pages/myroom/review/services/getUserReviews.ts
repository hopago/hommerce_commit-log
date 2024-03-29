import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";
import { ReviewFilterOption } from "../../../../recoil/pagination/search/filter/filter";

export type GetUserReviews = {
  filter?: ReviewFilterOption;
  searchTerm?: string;
  pageNum: number;
  userId: string;
  sort: "최신순" | "오래된순";
};

const translateQueryValueToEn = (filter: ReviewFilterOption) => {
  const filterMap = {
    "검색 옵션": null,
    "리뷰 내용": "desc",
    "책 제목": "bookTitle",
  };

  return filterMap[filter] || null;
};

export const getUserReviews = ({
  filter,
  searchTerm,
  pageNum,
  userId,
  sort = "최신순",
}: GetUserReviews): Promise<PaginatedReviewResponse> => {
  let path: string = `/review/user/${userId}`;

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

  return restFetcher<PaginatedReviewResponse>({
    method: "GET",
    path,
  });
};
