import { useQuery } from "@tanstack/react-query";
import { useImageSlide } from "../../hooks/use-image-slide";

import AuthorHeading from "./AuthorHeading";
import Authors from "./Authors";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { findBestAuthors } from "../services/findBestAuthors";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";

export default function AuthorSection() {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: [QueryKeys.AUTHORS, "best"],
    queryFn: () => findBestAuthors(),
    staleTime: daysToMs(7),
    gcTime: daysToMs(9),
  });

  const { handleNext, handlePrev, prevDisabled, nextDisabled, index } =
    useImageSlide({
      total: data?.length ?? 0,
      itemsPerSlide: 1,
      pixelPerSlide: 302,
      preventNextNumber: 2,
    });

  useHandleError({ isError, error });

  if (isSuccess && data.length) {
    return (
      <div id="recommend-author" className="author">
        <div className="author__wrapper">
          <AuthorHeading
            handleNext={handleNext}
            handlePrev={handlePrev}
            prevDisabled={prevDisabled}
            nextDisabled={nextDisabled}
          />
          <Authors authors={data} currIndex={index} />
        </div>
      </div>
    );
  }
}
