import FixedSearchBar from "../_components/FixedSearchBar";
import SearchHeading from "./_components/search/SearchHeading";
import SearchAD from "./_components/search/SearchAD";
import SearchFilter from "./_components/search/SearchFilter";
import SearchContents from "./_components/search/SearchContents";
import FixedSeenBooks from "../../_components/FixedSeenBooks";
import { Footer } from "../_components";
import GlobalLoadingLayout from "../../_components/GlobalLoadingLayout";

import { getKeyword } from "./utils/get-keyword";
import { useModalDisplayState } from "./hooks/use-modal-state";
import { useSearchForm } from "../hooks/use-search-form";

import { useRecoilState, useRecoilValue } from "recoil";
import { searchFilterState } from "../../recoil/search/search-filter";
import { searchPageEnabled } from "../../recoil/api/search-page-enabled";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../lib/react-query/query-key";
import { QueryFns } from "../../lib/react-query/queryFn";
import { daysToMs } from "../../lib/react-query/utils";
import { useHandleError } from "../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../api/constants/errorDetails";

import { useEffect } from "react";

import noResults from "../../assets/img_no-results.png";

import { getQueryClient } from "../../lib/react-query/getQueryClient";

export default function SearchIndex() {
  const queryClient = getQueryClient();

  const keyword = getKeyword();

  useModalDisplayState();

  if (!keyword) return null;

  const { onSubmit, onChange, searchTerm } = useSearchForm();
  const filter = useRecoilValue<SearchType>(searchFilterState);
  const [shouldRefetch, setShouldRefetch] = useRecoilState(searchPageEnabled);

  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery({
    queryKey: [QueryKeys.BOOKS_DOCS_LENGTH, keyword],
    queryFn: () => QueryFns.GET_BOOK_SEARCH_RESULTS_LENGTH({ filter, keyword }),
    staleTime: daysToMs(5),
    gcTime: daysToMs(7),
    enabled: shouldRefetch,
  });

  useEffect(() => {
    if (shouldRefetch) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOOKS_DOCS_LENGTH, keyword],
      });
      refetch();
    }
  }, [shouldRefetch]);

  useEffect(() => {
    if (isSuccess) {
      setShouldRefetch(false);
    }
  }, [isSuccess]);

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.BOOKS_DOCS_LENGTH,
  });

  if (isLoading) return <GlobalLoadingLayout />;

  if (isError || (isSuccess && data.docsLength === 0)) return <NoContents />;

  if (isSuccess) {
    return (
      <div id="search-page">
        <FixedSearchBar
          onChange={onChange}
          onSubmit={onSubmit}
          searchTerm={searchTerm}
        />
        <header>
          <SearchHeading docsLength={data.docsLength} />
        </header>
        <main>
          <section className="search-ad">
            <SearchAD />
          </section>
          <section className="search-contents">
            <SearchFilter />
            <aside>
              <SearchContents docsLength={data.docsLength} />
            </aside>
          </section>
        </main>
        <Footer />
        <FixedSeenBooks />
      </div>
    );
  }
}

function NoContents() {
  return (
    <div id="search-page">
      <FixedSearchBar />
      <header>
        <SearchHeading docsLength={0} />
      </header>
      <main>
        <section className="search-ad">
          <SearchAD />
        </section>
        <section className="search-contents">
          <SearchFilter />
          <aside>
            <div className="search-contents__container">
              <div className="no-content-wrap">
                <img
                  src={noResults}
                  alt="no-results"
                  className="no-content-img"
                />
                <p className="no-content-text">
                  검색어의 철자가 정확한지 다시 한 번 확인해주세요.
                  <br />
                  검색어의 단어 수를 줄이거나, 두 단어 이상의 검색어인 경우,
                  띄어쓰기를 해주세요.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
      <FixedSeenBooks />
    </div>
  );
}
