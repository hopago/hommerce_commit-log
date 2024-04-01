import { MdArrowRight } from "react-icons/md";

import { cn } from "../../../../lib/utils";

type NextPageProps = {
  pageTotal: number;
  onNextPage: (pageTotal: number) => void;
  disabled: boolean;
};

export default function NextPage({
  pageTotal,
  onNextPage,
  disabled,
}: NextPageProps) {
  const onClick = () => {
    onNextPage(pageTotal);
  };

  return (
    <button
      type="button"
      className={cn(
        "reviews-pagination__arrow-btn right",
        disabled && "disabled"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <MdArrowRight className="icon" />
    </button>
  );
}
