import { cn } from "../../../lib/utils";

type CartHeadingProps = {
  itemLength: number;
};

const processInfo = ["장바구니", "주문/결제"];

const temporaryProcessStep = 0;

export default function CartHeading({ itemLength }: CartHeadingProps) {
  return (
    <div className="cart-heading">
      <div className="cart-heading__wrap">
        <div className="cart-heading__wrap__title">
          <h1>장바구니&nbsp;({itemLength})</h1>
        </div>
        <div className="cart-heading__wrap__process">
          <ol>
            {processInfo.map((p, i) => (
              <li key={p}>
                <span
                  className={cn(
                    "curr-step",
                    temporaryProcessStep === i && "active"
                  )}
                >
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
