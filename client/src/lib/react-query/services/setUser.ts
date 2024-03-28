import { useUser } from "@clerk/clerk-react";

import { IUser } from "../../../types/api/user";
import { getQueryClient } from "../getQueryClient";
import { QueryKeys } from "../query-key";

export const setQueryClientUserData = (updatedUser: IUser | undefined) => {
  const { user } = useUser();

  if (!user) return;

  if (updatedUser) {
    const queryClient = getQueryClient();
    const userData = queryClient.getQueryData([QueryKeys.USER, user?.id]);

    if (userData) {
      queryClient.setQueryData([QueryKeys.USER, user?.id], updatedUser);
    }
  }
};
