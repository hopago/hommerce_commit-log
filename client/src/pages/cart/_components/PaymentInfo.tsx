import { useRecoilValue } from "recoil";
import {
  productPriceInfoState,
  selectedCartProductState,
} from "../../../recoil/cart/product-to-pay";

import CommonButton from "../../../_components/common/CommonButton";

export default function PaymentInfo() {
  const priceInfo = useRecoilValue(productPriceInfoState);
  const selected = useRecoilValue(selectedCartProductState);

  return (
    <div className="payment-info">
      <div className="payment-info__wrap">
        <div className="payment-info__wrap__item">
          <div className="text-wrap">
            <span className="heading">상품 금액</span>
            <div className="price-number">
              <span className="price">{priceInfo.total.toLocaleString()}</span>
              <span className="unit">원</span>
            </div>
          </div>
        </div>
        <div className="payment-info__wrap__item">
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
        <div className="payment-info__wrap__item">
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
        <CommonButton
          style="purple"
          size="lg"
          text={`주문하기 (${selected.length ?? 0})`}
        />
      </div>
    </div>
  );
}
