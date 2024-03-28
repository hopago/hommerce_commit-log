import { atom, selector } from "recoil";

export type SelectedCartProductState = {
  bookId: string;
  price: number;
  discount?: number | null;
  amount: number;
}[];

export const selectedCartProductState = atom<SelectedCartProductState>({
  key: "selectedCartProduct",
  default: [],
});

export const productPriceInfoState = selector({
  key: "cartProductPriceInfoState",
  get: ({ get }) => {
    const selectedCartProductStates = get(selectedCartProductState);
    if (!selectedCartProductStates) return { total: 0, discountedTotal: 0 };

    const total = selectedCartProductStates.reduce((acc, product) => {
      return acc + product.price * product.amount;
    }, 0);

    const discountedTotal = selectedCartProductStates.reduce((acc, product) => {
      const discountRate = product.discount ?? 0;
      const discountedPrice =
        product.price * (1 - discountRate / 100) * product.amount;
      return acc + discountedPrice;
    }, 0);

    const discountAmount = total - discountedTotal;

    return { total, discountedTotal, discountAmount };
  },
});
