import { atom } from "recoil";

export const editUserModal = atom<boolean>({
  key: "editUserModal",
  default: false,
});
