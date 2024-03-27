import { MdClose } from "react-icons/md";

import ParentCategoryBadge from "../../../pages/_components/ParentCategoryBadge";
import FavorButton from "../../../pages/search/_components/FavorButton";

import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { getQueryClient } from "../../../lib/react-query/getQueryClient";
import { Link } from "react-router-dom";

type SeenBookItemProps = {
  book: IBook;
};

export default function SeenBookItem({ book }: SeenBookItemProps) {
  const { user } = useUser();

  const queryClient = getQueryClient();
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

  const removeBookId = (deletedBookId: string) => {
    const seenBookIds: string[] = JSON.parse(
      localStorage.getItem("seenBookIds") || "[]"
    );

    const updatedBookIds = seenBookIds.filter((id) => id !== deletedBookId);

    queryClient.setQueryData([QueryKeys.SEEN_BOOKS], updatedBookIds);

    localStorage.setItem("seenBookIds", JSON.stringify(updatedBookIds));
  };

  const handleDelete = () => {
    removeBookId(book._id);
  };

  return (
    <li className="seen-book-list__wrap__book-list__wrap__book-item">
      <Link to={`/details/${book._id}`} className="link">
        <div className="img-wrap">
          <img src={book.representImg} alt={book.title} />
        </div>
      </Link>
      <div className="seen-book-list__wrap__book-list__wrap__book-item__book-info">
        {book.parentCategory.map((category) => (
          <ParentCategoryBadge key={category} text={category} />
        ))}
        <Link to={`/details/${book._id}`} className="link">
          <h1 className="title">{book.title}</h1>
        </Link>
        <p className="author">{book.author}</p>
        <div className="text-wrap">
          {book.discount ? (
            <span className="discount">{book.discount}</span>
          ) : null}
          <span className="price" style={{ fontWeight: "bold" }}>
            {book.price.toLocaleString()}
          </span>
          <span className="unit">{book.unit}</span>
        </div>
      </div>
      <div className="seen-book-list__wrap__book-list__wrap__book-item__buttons">
        <button className="close" onClick={handleDelete}>
          <span>
            <MdClose />
          </span>
        </button>
        <div className="heart-button-wrap">
          <FavorButton
            bookId={book._id}
            title={book.title}
            author={book.author}
            img={book.representImg}
            isSubscribed={isSubscribed}
            userId={user?.id!}
            width={34}
            height={34}
            imgWidth={14}
            imgHeight={14}
            margin={0}
          />
        </div>
      </div>
    </li>
  );
}
