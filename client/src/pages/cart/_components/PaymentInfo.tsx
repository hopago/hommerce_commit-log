import { useRecoilValue } from "recoil";
import { productPriceInfoState } from "../../../recoil/cart/product-to-pay";
import ReuseButton from "../../../_components/ReuseButton";
import { getCartData } from "../utils/getCartData";
import { useUser } from "@clerk/clerk-react";

export default function PaymentInfo() {
  const { user } = useUser();
  const priceInfo = useRecoilValue(productPriceInfoState);
  const { cartData } = getCartData(user?.id!);

  return (
    <div className="payment-info">
      <div className="payment-info__wrap">
        <div className="price-info__wrap__item">
          <div className="text-wrap">
            <span className="heading">상품 금액</span>
            <div className="price-number">
              <span className="price">{priceInfo.total.toLocaleString()}</span>
              <span className="unit">원</span>
            </div>
          </div>
          <div className="text-wrap">
            <span className="heading">상품 할인</span>
            <div className="price-number">
              <span className="price">
                {priceInfo.discountAmount && priceInfo.discountAmount < 0
                  ? `-${priceInfo.discountAmount?.toLocaleString()}`
                  : priceInfo.discountAmount?.toLocaleString()}
              </span>
              <span className="unit">원</span>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="price-info__wrap__item">
          <div className="text-wrap">
            <span className="heading bold">결제 예정 금액</span>
            <div className="price-number">
              <span className="price bold">
                {priceInfo.total.toLocaleString()}
              </span>
              <span className="unit">원</span>
            </div>
          </div>
        </div>
        <ReuseButton
          style="purple"
          size="md"
          text={`주문하기 (${cartData?.books.length ?? 0})`}
        />
      </div>
    </div>
  );
}
