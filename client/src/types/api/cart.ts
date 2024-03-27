interface CartActionRequestBody {
  actionType: "add" | "remove";
  amount: number;
  bookId?: string;
  title?: string;
  author?: string;
  img?: string;
  price?: number;
  unit?: string;
}

type CartItem = {
  bookId: string;
  title: string;
  author: string;
  img: string;
  amount: number;
  price: number;
  unit: "원";
  discount?: number;
};

type CartList = CartItem[];

interface ICart {
  userId: string;
  books: CartList;
}
