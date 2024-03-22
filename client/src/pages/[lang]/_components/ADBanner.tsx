import NextIcon from "../../_components/NextIcon";
import PrevIcon from "../../_components/PrevIcon";
import ADSlider from "./ADSlider";
import ADTabInfo from "./ADTabInfo";

import { adBannerImages } from "../constants/showcase-ads";

import { useTimeoutImageSlide } from "../hooks/use-image-slide";

export default function ADBanner() {
  const { slideRef, handlePrev, handleNext, setCurrIndex, currIndex } =
    useTimeoutImageSlide(adBannerImages.length, 1000);

  return (
    <div className="ad-banner">
      <PrevIcon handlePrev={handlePrev} />
      <ADSlider ref={slideRef} images={adBannerImages} />
      <NextIcon handleNext={handleNext} />
      <ADTabInfo setCurrIndex={setCurrIndex} currIndex={currIndex} />
    </div>
  );
}
