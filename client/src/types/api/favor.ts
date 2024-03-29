type FavorItem = {
  bookId: string;
  title: string;
  author: string;
  img: string;
};

type FavorList = {
  userId: string;
  books: FavorItem[];
};

interface IFavor extends Document {
  userId: string;
  books: FavorItem[];
}