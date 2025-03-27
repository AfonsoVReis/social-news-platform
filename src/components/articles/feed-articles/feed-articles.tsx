'use client';
import { Button, Typography } from '@mui/material';
import { ReactNode, useMemo, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { AnimationFade } from '@/components/animation-fade';
import { Tag } from '@/components/tag';
import { useArticles } from '@/hooks/use-articles';
import { isAdmin } from '@/utils/users';
import { FeedArticle } from './feed-article/feed-article';
import styles from './feed-articles.module.css';

export const FeedArticles = (): ReactNode => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useUser();

  const {
    articles,
    availableCategories,
    currentPage,
    draftArticles,
    filterByCategory,
    nextPage,
    previousPage,
    resetFilters,
    totalPages,
  } = useArticles();

  const handleFilterByCategory = (category: string) => {
    setSelectedCategory((previousCategory) => {
      if (previousCategory === category) {
        resetFilters();
        return null;
      }

      filterByCategory(category);
      return category;
    });
  };

  const handleFilterByDraftStatus = () =>
    setSelectedCategory((previousCategory) =>
      previousCategory === 'draft' ? null : 'draft',
    );

  const articlesData = useMemo(
    () => (selectedCategory === 'draft' ? draftArticles : articles),
    [articles, draftArticles, selectedCategory],
  );

  if (!articlesData.length) {
    return (
      <Typography className={styles.noContent} variant="h3">
        No articles found.
      </Typography>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.categories}>
        {isAdmin(user) && (
          <>
            <Tag
              isActive={selectedCategory === 'draft'}
              key="draft-tag"
              label="Drafted"
              onClick={handleFilterByDraftStatus}
              variant="secondary"
            />

            <div className={styles.divider} />
          </>
        )}

        {availableCategories.map((category) => (
          <Tag
            isActive={category === selectedCategory}
            key={category}
            label={category}
            onClick={() => handleFilterByCategory(category)}
          />
        ))}
      </div>

      <AnimationFade
        className={styles.articles}
        key={`${selectedCategory}-${currentPage}`}
      >
        {articlesData.map((article) => (
          <FeedArticle article={article} key={article.id} />
        ))}
      </AnimationFade>

      {!selectedCategory && (
        <div className={styles.pagination}>
          <Button disabled={currentPage === 1} onClick={previousPage}>
            Previous
          </Button>

          <Typography variant="button">{`Page ${currentPage} of ${totalPages}`}</Typography>

          <Button disabled={currentPage >= totalPages} onClick={nextPage}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
