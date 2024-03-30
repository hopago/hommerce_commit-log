import { deleteFavorItem } from "./deleteFavorItem";

export const deleteFavorItemsByBookIds = async (
  userId: string,
  ids: string[]
) => {
  if (!userId || !ids) return;

  const idsArray = Array.isArray(ids) ? ids : [ids];

  const deletedIds = await Promise.all(
    idsArray.map((id) => deleteFavorItem(userId, id))
  );
  return deletedIds;
};
