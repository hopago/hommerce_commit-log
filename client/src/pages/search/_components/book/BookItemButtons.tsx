import FavorButton from "../FavorButton";
import ReuseButton from "../../../../_components/common/ReuseButton";

import { UIType } from "../../hooks/use-select-ui";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../lib/react-query/queryFn";
import { daysToMs } from "../../../../lib/react-query/utils";

import { useUser } from "@clerk/clerk-react";

import { useUpdateCart } from "../../../details/[bookId]/hooks/use-update-cart";
import { toast } from "sonner";
import { postError } from "../../../services/postError";

type BookItemButtonsProps = {
  book: IBook;
  display: UIType;
};

export default function BookItemButtons({
  book,
  display,
}: BookItemButtonsProps) {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QueryKeys.FAVOR_LENGTH, book._id],
    queryFn: () => QueryFns.GET_FAVOR_SUBSCRIPTION_LENGTH({ bookId: book._id }),
    staleTime: daysToMs(7),
    gcTime: daysToMs(9),
    enabled: !!book._id,
  });
  const { data: isSubscribed } = useQuery({
    queryKey: [QueryKeys.FAVOR_SUBSCRIPTION, book._id],
    queryFn: () =>
      QueryFns.GET_FAVOR_SUBSCRIPTION_IS_SUBSCRIBED({
        bookId: book._id,
        userId: user!.id,
      }),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: Boolean(user),
  });

  const { handlePatch } = useUpdateCart({
    userId: user?.id,
    amount: 1,
    actionType: "add",
  });

  const handleAddCart: any = async () => {
    try {
      await handlePatch(book, user?.id, "add", 1);

      toast.success("상품이 장바구니에 담겼습니다.");
    } catch (err) {
      postError(err);
    }
  };

  return (
    <div className="book-item-buttons">
      <FavorButton
        favorLength={data?.docsLength}
        bookId={book._id}
        title={book.title}
        author={book.author}
        img={book.representImg}
        isSubscribed={isSubscribed}
        userId={user?.id ?? null}
        imgWidth={14}
        imgHeight={14}
      />
      {display === "flex" && (
        <>
          <ReuseButton
            text="장바구니"
            size="md"
            style="default"
            onClick={handleAddCart}
          />
          <ReuseButton text="바로구매" size="md" style="purple" />
        </>
      )}
    </div>
  );
}
