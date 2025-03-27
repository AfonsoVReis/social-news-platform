export interface Article {
  authorId: string;
  authorName: string;
  body: string;
  category: string;
  date: string | number;
  description: string;
  id: string;
  imageUrl: string;
  title: string;
  isDraft: boolean;
}
