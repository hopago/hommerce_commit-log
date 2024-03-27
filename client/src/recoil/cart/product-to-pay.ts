import { atom, selector } from "recoil";

type SelectedCartProductState = {
  bookId: string;
  price: number;
  discount?: number | null;
}[];

export const selectedCartProductState = atom<SelectedCartProductState | null>({
  key: "selectedCartProduct",
  default: null,
});

export const productPriceInfoState = selector({
  key: "cartProductPriceInfoState",
  get: ({ get }) => {
    const selectedCartProductStates = get(selectedCartProductState);
    if (!selectedCartProductStates) return { total: 0, discountedTotal: 0 };

    const total = selectedCartProductStates.reduce(
      (acc, product) => acc + product.price,
      0
    );

    const discountedTotal = selectedCartProductStates.reduce((acc, product) => {
      const discountRate = product.discount ?? 0;
      const discountedPrice = product.price * (1 - discountRate / 100);
      return acc + discountedPrice;
    }, 0);

    const discountAmount = total - discountedTotal;

    return { total, discountedTotal, discountAmount };
  },
});
