export const ERROR_DETAILS = {
  FIND_REFERRER_CATEGORY_BEST_AUTHORS: [
    {
      code: 400,
      message: "연관 카테고리 혹은 책 아이디가 필요합니다.",
    },
    {
      code: 404,
      message: "관련 작가 정보가 아직 준비되지 않았습니다.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  FIND_RECOMMEND_BOOK_BY_CATEGORY: [
    {
      code: 400,
      message: "연관 카테고리가 필요합니다.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  GET_AUTHOR: [
    {
      code: 400,
      message: "필수 필드를 확인해주세요.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  GET_BOOK: [
    {
      code: 400,
      message: "책 아이디가 필요합니다.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  GET_BOOK_DETAILS: [
    {
      code: 400,
      message: "책 아이디가 필요합니다.",
    },
    {
      code: 404,
      message: "책 상세 내용이 아직 없어요.",
    },
    {
      code: 500,
      message: "서버 에러입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  GET_REVIEWS_BY_BOOK_ID: [
    {
      code: 400,
      message: "필수 필드를 확인해주세요.",
    },
    {
      code: 404,
      message: "리뷰 데이터를 찾지 못했어요.",
    },
    {
      code: 500,
      message: "서버 에러입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  BOOKS_DOCS_LENGTH: [
    {
      code: 400,
      message: "검색어 설정 오류입니다. 잠시 후 다시 시도해주세요.",
    },
    {
      code: 404,
      message: "검색 결과가 없어요.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  BOOKS_SEARCH_RESULTS: [
    {
      code: 404,
      message: "검색 결과가 없어요.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  PATCH_CART: [
    {
      code: 400,
      message: "도서 수량을 확인해주세요.",
    },
    {
      code: 404,
      message: "장바구니 정보를 찾을 수 없어요.",
    },
    {
      code: 500,
      message: "서버 에러입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  PATCH_FAVOR_ITEM: [
    {
      code: 400,
      message: "필드 오류입니다. 로그인 상태 확인 혹은 새로고침을 해주세요.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  PATCH_REVIEW_REPLY: [
    {
      code: 404,
      message: "답글을 찾지 못했어요.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  POST_REVIEW: [
    {
      code: 400,
      message: "모든 필수 정보가 입력됐는지 확인해주세요.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
  POST_REVIEW_REPLY: [
    {
      code: 400,
      message: "모든 필수 정보가 입력됐는지 확인해주세요.",
    },
    {
      code: 404,
      message: "리뷰 정보를 찾을 수 없습니다.",
    },
    {
      code: 500,
      message: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    },
  ],
};
