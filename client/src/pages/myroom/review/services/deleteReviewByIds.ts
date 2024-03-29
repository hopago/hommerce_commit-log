import { deleteReview } from "./deleteReview";

export const deleteReviewByIds = async (ids: string[] | string) => {
  const idsArray = Array.isArray(ids) ? ids : [ids];
  const deletedIds = await Promise.all(idsArray.map((id) => deleteReview(id)));
  return deletedIds;
};
