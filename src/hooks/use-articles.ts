import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  addArticle,
  removeArticle,
  toggleDraftStatus,
  updateArticle,
} from '@/store/features/articles-slice';
import { RootState } from '@/store/store';
import { Article } from '@/types/article';

const ARTICLES_PER_PAGE = 6;

export const useArticles = (id: string = '1') => {
  const [category, setCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articles = useSelector((state: RootState) => state.articles);
  const dispatch = useDispatch();

  const { draftArticles, paginatedArticles, totalPages } = useMemo(() => {
    const filtered = articles.filter(
      (article) =>
        !article.isDraft && (!category || article.category === category),
    );

    return {
      draftArticles: articles.filter((article) => article.isDraft),
      paginatedArticles: filtered.slice(
        (currentPage - 1) * ARTICLES_PER_PAGE,
        currentPage * ARTICLES_PER_PAGE,
      ),
      totalPages: Math.ceil(filtered.length / ARTICLES_PER_PAGE) || 1,
    };
  }, [articles, category, currentPage]);

  const article = useMemo(
    () => articles.find((article) => article.id === id) || null,
    [articles, id],
  );

  const availableCategories = useMemo(
    () => [...new Set(articles.map((article) => article.category))],
    [articles],
  );

  const handleAddArticle = (articleData: Article) => {
    dispatch(addArticle({ ...articleData }));

    toast.success('Article added successfully');
  };

  const handleRemoveArticle = (articleId: string) => {
    dispatch(removeArticle(articleId));

    toast.success('Article deleted successfully');
  };

  const handleUpdateArticle = (updatedArticle: Article) => {
    dispatch(updateArticle(updatedArticle));

    toast.success('Article updated successfully');
  };

  const handleToggleDraftStatus = (articleId: string) => {
    dispatch(toggleDraftStatus(articleId));

    toast.success('Draft status updated');
  };

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  const previousPage = () => setCurrentPage((prev) => prev - 1);

  const resetFilters = () => {
    setCategory(null);
    setCurrentPage(1);
  };

  const filterByCategory = (newCategory: string | null) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  return {
    article,
    articles: paginatedArticles,
    availableCategories,
    currentPage,
    draftArticles,
    filterByCategory,
    handleAddArticle,
    handleRemoveArticle,
    handleToggleDraftStatus,
    handleUpdateArticle,
    nextPage,
    previousPage,
    resetFilters,
    totalPages,
  };
};
