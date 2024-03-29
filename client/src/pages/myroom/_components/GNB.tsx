import { Link } from "react-router-dom";

const GNBList = [
  {
    listHeader: "포인트",
    listItems: [
      {
        text: "포인트 지급 내역",
        href: "/myroom/point",
      },
    ],
  },
  {
    listHeader: "위시리스트",
    listItems: [
      {
        text: "위시리스트 목록 ",
        href: "/myroom/wish",
      },
    ],
  },
  {
    listHeader: "활동내역",
    listItems: [
      {
        text: "리뷰 내역",
        href: "/myroom/review",
      },
    ],
  },
];

export default function GNB() {
  return (
    <div className="myroom-gnb">
      <div className="myroom-gnb__wrap">
        <ul>
          {GNBList.map((list) => (
            <li key={list.listHeader}>
              <h1>{list.listHeader}</h1>
              {list.listItems.map((listItem) => (
                <Link key={listItem.text} to={listItem.href} className="link">
                  <span>{listItem.text}</span>
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
