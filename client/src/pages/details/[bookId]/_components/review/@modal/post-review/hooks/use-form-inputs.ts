import { useState } from "react";

export const useFormInputs = () => {
  const [keyword, setKeyword] = useState<ReviewKeywords | null>(null);
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState<ReviewRatingValue>(5);

  const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handleChangeKeyword = (keyword: ReviewKeywords) => {
    setKeyword(keyword);
  };

  const handleScoreChange = (selectedScore: ReviewRatingValue) => {
    setScore(selectedScore);
  };

  return {
    keyword,
    desc,
    score,
    handleChangeDesc,
    handleChangeKeyword,
    handleScoreChange,
  };
};
