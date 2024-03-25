import { atom } from "recoil";

export const detailsPageEnabled = atom<boolean>({
  key: "detailsPageEnabled",
  default: true,
});
