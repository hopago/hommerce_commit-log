import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { MutateFns } from "../../../../../lib/react-query/mutateFn";
import { IUser } from "../../../../../types/api/user";
import { ServerError } from "../../../../../fetcher/error";

import { useClerk } from "@clerk/clerk-react";

import { toast } from "sonner";

import { setQueryClientUserData } from "../../../../../lib/react-query/services/setUser";

type UseUpdateUserProps = {
  username: string;
};

export const useUpdateUser = ({ username }: UseUpdateUserProps) => {
  const clerk = useClerk();

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localUsername, setLocalUsername] = useState(username);
  const [isClerkUpdated, setIsClerkUpdated] = useState(false);

  const { mutate, mutateAsync, isPending } = useMutation<
    IUser | undefined,
    ServerError | Error,
    { imageUrl?: string; username: string }
  >({
    mutationFn: ({ imageUrl, username }) =>
      MutateFns.UPDATE_USER({ imageUrl, username }),
    onSuccess: (updatedUser: IUser | undefined) => {
      setQueryClientUserData(updatedUser);
    },
    onError: (error) => {
      if (error instanceof ServerError) {
        toast.error("유저 정보를 변경하던 중 문제가 생겼어요.");
      } else {
        toast.error("예기치 못한 오류가 발생했습니다.");
      }
    },
  });

  useEffect(() => {
    if (file) {
      handleClerkUpdate(file);
      setFile(null);
    }
  }, [file]);

  useEffect(() => {
    if (isClerkUpdated) {
      mutate({ username, imageUrl });
    }
  }, [isClerkUpdated]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUsername(e.target.value);
  };
  const handleClerkUpdate = async (file: File) => {
    setIsClerkUpdated(false);
    try {
      const updatedImageUrl = await clerk.user?.setProfileImage({ file });

      if (updatedImageUrl?.publicUrl) {
        setIsClerkUpdated(true);
        setImageUrl(updatedImageUrl.publicUrl);
      }
    } catch (err) {
      setIsClerkUpdated(false);
      toast.error(
        "이미지를 업로드 하던 도중 문제가 생겼습니다.\n잠시 후 다시 시도해주세요."
      );
    }
  };

  const handleChangeUsername = async () => {
    const updatedUser = await mutateAsync({ username: localUsername });
    if (updatedUser) {
      await clerk.user?.update({
        username: updatedUser.username,
      });
      setQueryClientUserData(updatedUser);
    }
  };

  return {
    isPending,
    localUsername,
    onChangeFile,
    onChangeUsername,
    handleChangeUsername,
  };
};
