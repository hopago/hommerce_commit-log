type RecommendGNBListProps = {
  list: HeadingCategoryItem;
};

const mapHeadingCategoryToId = (
  headingCategory: HeadingCategory
): string | null => {
  switch (headingCategory) {
    case "Picks":
      return "picks";
    case "이달의 책":
      return null;
    case "추천":
      return "recommend-books";
    case "인물&작품":
      return "recommend-author";
    case "할인혜택":
      return null;
    default:
      return null;
  }
};

export default function RecommendGNBList({ list }: RecommendGNBListProps) {
  const handleOnClick = () => {
    const targetId = mapHeadingCategoryToId(list.text);
    if (!targetId) return;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <li onClick={handleOnClick}>
      {list.Icon}
      <p>{list.text}</p>
    </li>
  );
}
