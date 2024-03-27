import { getQueryClient } from "../../../lib/react-query/getQueryClient";

import { QueryKeys } from "../../../lib/react-query/query-key";

export const getCartData = (userId: string) => {
  const queryClient = getQueryClient();
  const data = queryClient.getQueryData<ICart | undefined>([
    QueryKeys.CART,
    userId,
  ]);

  return data;
};
