import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export const selectedIdsState = atom<string[]>({
  key: "selectedIdsState",
  default: [],
});

export const totalLengthState = atom<number | null>({
  key: "totalLengthState",
  default: null,
});

export const totalReviewIdsState = atom<string[]>({
  key: "totalReviewIds",
  default: [],
});

export const isSelectedAllState = selector<boolean>({
  key: "isSelectedAllState",
  get: ({ get }) => {
    const selectedIds = get(selectedIdsState);
    const totalLength = get(totalLengthState);
    return (
      selectedIds.length > 0 &&
      totalLength !== null &&
      selectedIds.length === totalLength
    );
  },
});

export const useSelectReview = () => {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);
  const setTotalLength = useSetRecoilState(totalLengthState);
  const totalReviewIds = useRecoilValue(totalReviewIdsState);
  const isSelectedAll = useRecoilValue(isSelectedAllState);

  const toggleId = (userId: string) => {
    setSelectedIds((ids) => {
      if (ids.includes(userId)) {
        return ids.filter((id) => id !== userId);
      } else {
        return [...ids, userId];
      }
    });
  };

  const toggleSelectAll = (userIds: string[]) => {
    setSelectedIds((ids) => {
      if (ids.length === userIds.length) {
        return [];
      } else {
        return userIds;
      }
    });
  };

  const setIsSelectedAll = (value: boolean) => {
    if (value) {
      setSelectedIds(totalReviewIds);
    } else {
      setSelectedIds([]);
    }
  };

  const resetState = () => {
    setSelectedIds([]);
    setTotalLength(null);
  };

  return {
    selectedIds,
    totalLength: useRecoilState(totalLengthState)[0],
    currSelected: selectedIds.length,
    isSelectedAll,
    setTotalLength,
    toggleId,
    toggleSelectAll,
    setIsSelectedAll,
    resetState,
  };
};

export default useSelectReview;
