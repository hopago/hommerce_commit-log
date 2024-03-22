import { DefaultValue, atom, selector } from "recoil";

export const isShowEnhancedImageModal = atom<boolean>({
  key: "enhancedImageModal",
  default: false,
});

export const enhancedImageModal = selector({
  key: "setEnhancedImageModal",
  get: ({ get }) => get(isShowEnhancedImageModal),
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
      const currState = get(isShowEnhancedImageModal);
      set(isShowEnhancedImageModal, !currState);
    } else {
      set(isShowEnhancedImageModal, newValue);
    }
  },
});
