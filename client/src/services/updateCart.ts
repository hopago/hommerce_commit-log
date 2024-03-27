import { restFetcher } from "../fetcher/restFetcher";
import { isFieldsFulfilled } from "../utils/isFieldsFulfilled";

type UpdateCartProps = CartActionRequestBody & { userId: string };

const requiredFields: (keyof UpdateCartProps)[] = [
  "userId",
  "actionType",
  "amount",
  "bookId",
  "title",
  "author",
  "img",
  "price",
  "unit",
];

export const updateCart = async ({
  userId,
  actionType,
  amount,
  bookId,
  title,
  author,
  img,
  price,
  unit,
}: UpdateCartProps) => {
  const props = {
    userId,
    actionType,
    amount,
    bookId,
    title,
    author,
    img,
    price,
    unit,
  };

  isFieldsFulfilled<UpdateCartProps>(props, requiredFields);
  if (!isFieldsFulfilled) return;

  try {
    const updatedCart = await restFetcher<ICart>({
      path: `/cart/${userId}`,
      method: "PATCH",
      body: {
        actionType,
        amount,
        bookId,
        title,
        author,
        img,
        price,
        unit,
      },
    });

    return updatedCart;
  } catch (err) {
    throw err;
  }
};
