import FixedSeenBooks from "../../_components/FixedSeenBooks";
import { Footer } from "../_components";
import FixedSearchBar from "../_components/FixedSearchBar";
import CartHeading from "./_components/CartHeading";
import CartList from "./_components/CartList";
import ControlOverallCart from "./_components/ControlOverallCart";
import PaymentInfo from "./_components/PaymentInfo";

import { useSearchForm } from "../hooks/use-search-form";

export default function CartIndex() {
  const { onSubmit, onChange, searchTerm } = useSearchForm();

  return (
    <div id="cart-page">
      <FixedSearchBar
        onChange={onChange}
        searchTerm={searchTerm}
        onSubmit={onSubmit}
      />
      <header>
        <CartHeading />
      </header>
      <main>
        <section className="cart-control">
          <ControlOverallCart />
        </section>
        <section className="cart-contents">
          <CartList />
          <aside>
            <PaymentInfo />
          </aside>
        </section>
      </main>
      <Footer />
      <FixedSeenBooks />
    </div>
  );
}
