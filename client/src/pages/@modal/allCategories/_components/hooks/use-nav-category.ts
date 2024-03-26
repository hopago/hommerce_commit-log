import { useState } from "react";

import { useNavigate } from "react-router-dom";

export const useNavCategory = () => {
  const navigate = useNavigate();

  const [parentCategory, setParentCategory] =
    useState<BookParentCategory>("국내도서");

  const handleChangeParentCategory = (category: BookParentCategory) => {
    setParentCategory(category);
  };

  const handleNavigate = (subCategory: BookSubCategory) => {
    navigate(`/category/${parentCategory}/${subCategory}`);
  };

  return {
    parentCategory,
    handleChangeParentCategory,
    handleNavigate,
  };
};
