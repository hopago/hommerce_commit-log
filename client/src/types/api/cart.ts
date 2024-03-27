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

interface ICart {
  userId: string;
  books: IBook[];
}
