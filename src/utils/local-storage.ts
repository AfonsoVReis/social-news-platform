import { Article } from '@/types/article';

export const updateLocalStorage = (articles: Article[]) => {
  localStorage.setItem('articles', JSON.stringify(articles));
};
