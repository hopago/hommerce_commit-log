const langToKorObj: Record<"kor" | "en", BookParentCategory> = {
  kor: "국내도서",
  en: "외국도서",
};

export const filterLangToKor = (
  lang: "kor" | "en" | string | undefined | "undefined"
) => {
  if (!lang || lang === "undefined") return;

  const found = Object.keys(langToKorObj).includes(lang);

  if (found) {
    return langToKorObj[lang as "kor" | "en"];
  }
};
