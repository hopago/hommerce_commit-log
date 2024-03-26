import { useEffect } from "react";
import { patchSeenBookCategory } from "../services/patchSeenBookCategory";

type UseRecordSeenBookProps = {
  bookId: string | undefined;
  userId: string | undefined;
  category: BookSubCategory | undefined;
};

export const useRecordSeenBook = ({
  bookId,
  userId,
  category,
}: UseRecordSeenBookProps) => {
  useEffect(() => {
    const seenBookIdsJSON = localStorage.getItem("seenBookIds");
    const seenBookIds = seenBookIdsJSON ? JSON.parse(seenBookIdsJSON) : [];

    if (!seenBookIds.includes(bookId)) {
      seenBookIds.push(bookId);
      localStorage.setItem("seenBookIds", JSON.stringify(seenBookIds));
    }
  }, [bookId]);

  useEffect(() => {
    if (category && userId) {
      patchSeenBookCategory(category, userId);
    }
  }, [bookId]);
};
