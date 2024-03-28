import { useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";

import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../lib/react-query/query-key";
import { QueryFns } from "../../../../lib/react-query/queryFn";
import { postError } from "../../../services/postError";

import { calculateDiscount } from "../../../../utils/calculate-price";
import { cn } from "../../../../lib/utils";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  amountState,
  setAmountState,
} from "../../../../recoil/cart/product-amount";
import { enhancedImageModal } from "../../../../recoil/modal/enhanced-image";
import { postReviewModal } from "../../../../recoil/modal/post-review";

import FavorButton from "../../../search/_components/FavorButton";
import AmountButton from "../../../../_components/common/AmountButton";
import ReuseButton from "../../../../_components/common/ReuseButton";

import { useNavigate } from "react-router-dom";

import { useUpdateCart } from "../hooks/use-update-cart";

import { toast } from "sonner";

type FixedPurchaseShortcutProps = {
  price: number | undefined;
  book: IBook;
};

export default function FixedPurchaseShortcut({
  price,
  book,
}: FixedPurchaseShortcutProps) {
  const navigate = useNavigate();

  const { user } = useUser();
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

  const isImageModalShow = useRecoilValue(enhancedImageModal);
  const isPostReviewModalShow = useRecoilValue(postReviewModal);

  const discountedPrice = book.discount
    ? calculateDiscount(price!, book.discount)
    : price;

  const [total, setTotal] = useState(discountedPrice ?? book.price);
  const amount = useRecoilValue(amountState);
  const setAmountSelector = useSetRecoilState(setAmountState);

  useEffect(() => {
    if (amount >= 10) {
      toast.info("수량 10개 이상부터는 대량주문안내를 참고 해주세요.");
    } else {
      setTotal(discountedPrice! * amount);
    }
  }, [amount]);

  const increaseAmount = () => {
    if (amount < 10) {
      setAmountSelector(1);
    }
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmountSelector(-1);
    }
  };

  const { handlePatch } = useUpdateCart({
    book,
    userId: user?.id,
    actionType: "add",
    amount,
  });

  const handleAddCart: any = async () => {
    try {
      await handlePatch();

      const isConfirmed = confirm(
        "상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?"
      );

      if (isConfirmed) navigate("/cart");
    } catch (err) {
      postError(err);
    }
  };

  return (
    <div
      className={cn(
        "fixed-purchase-shortcut",
        (isImageModalShow || isPostReviewModalShow) && "none"
      )}
    >
      <div className="fixed-purchase-shortcut__wrap">
        <div className="left-area">
          <span className="info-title">총 상품 금액</span>
          <div className="info-price">
            <span className="price">{total?.toLocaleString()}</span>
            <span className="unit">{book.unit}</span>
          </div>
        </div>
        <div className="right-area">
          <div className="buttons-wrap">
            <AmountButton
              size="md"
              amount={amount}
              increaseAmount={increaseAmount}
              decreaseAmount={decreaseAmount}
            />
            <FavorButton
              bookId={book._id}
              author={book.author}
              title={book.title}
              img={book.representImg}
              userId={user?.id!}
              isSubscribed={isSubscribed}
            />
            <ReuseButton
              text="장바구니"
              size="lg"
              style="default"
              onClick={handleAddCart}
            />
            <ReuseButton text="바로구매" size="lg" style="purple" />
          </div>
        </div>
      </div>
    </div>
  );
}
