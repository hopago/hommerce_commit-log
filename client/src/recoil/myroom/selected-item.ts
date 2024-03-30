import { atom } from "recoil";

export const selectedMyRoomWishListState = atom<FavorItem[]>({
  key: "selectedMyRoomWishList",
  default: [],
});

export const myRoomWishListTotalIds = atom<string[]>({
  key: "myRoomWishListTotal",
  default: [],
});
