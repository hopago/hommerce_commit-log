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
    if (bookId) {
      const seenBookIdsJSON = localStorage.getItem("seenBookIds");
      const seenBookIds: string[] = seenBookIdsJSON
        ? JSON.parse(seenBookIdsJSON)
        : [];

      if (!seenBookIds.includes(bookId)) {
        if (seenBookIds.length === 10) {
          seenBookIds.shift();
        }
        seenBookIds.push(bookId);
        localStorage.setItem("seenBookIds", JSON.stringify(seenBookIds));
      }
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId && category && userId) {
      patchSeenBookCategory(category, userId);
    }
  }, [bookId]);
};
