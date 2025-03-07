export interface IBook {
  id: number;
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  description: string;
  coverImgUrl: string;
}

export interface IReview {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  bookId: number;
}
