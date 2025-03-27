'use client';
import { ArrowBack, Delete, Mode, Preview, Publish } from '@mui/icons-material';
import { Divider, Fab, Typography } from '@mui/material';
import { NextPage } from 'next';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Page } from '@/components/layout/page';
import { Tag } from '@/components/tag';
import { UnderlineText } from '@/components/underline-text';
import { routes } from '@/constants/routes';
import { useArticles } from '@/hooks/use-articles';
import { formatDate } from '@/utils/date';
import { IconButton } from '@/components/icon-button';
import { isAdmin } from '@/utils/users';
import styles from './article-page.module.css';

const ArticlePage: NextPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const router = useRouter();

  const { article, handleRemoveArticle, handleToggleDraftStatus } = useArticles(
    id as string,
  );

  useEffect(() => {
    if (!article) {
      router.push(routes.feed);
    }
  }, [article, router]);

  const onRemoveArticle = useCallback(() => {
    if (!article) {
      return;
    }

    handleRemoveArticle(article.id);
    router.push(routes.feed);
  }, [article, handleRemoveArticle, router]);

  const onToggleDraftStatus = useCallback(() => {
    if (!article) {
      return;
    }

    handleToggleDraftStatus(article.id);
  }, [article, handleToggleDraftStatus]);

  if (!article) {
    return;
  }

  return (
    <Page className={styles.page}>
      <div className={styles.content}>
        <IconButton
          className={styles.arrowBack}
          onClick={() => router.push(routes.feed)}
        >
          <ArrowBack color="primary" />
        </IconButton>

        <Typography component="h1" fontWeight={700} variant="h2">
          <UnderlineText>{article.title}</UnderlineText>
        </Typography>

        <div className={styles.metaWrapper}>
          <div className={styles.articleMeta}>
            <Typography variant="caption">{article.authorName}</Typography>

            <Typography variant="caption">
              {formatDate(article.date as number)}
            </Typography>

            <Tag label={article.category} />
          </div>

          {isAdmin(user) && (
            <div className={styles.actions}>
              {article.isDraft ? (
                <Fab onClick={onToggleDraftStatus}>
                  <Publish color="success" />
                </Fab>
              ) : (
                <Fab onClick={onToggleDraftStatus}>
                  <Preview color="info" />
                </Fab>
              )}

              <Fab
                onClick={() =>
                  router.replace(`${routes.editArticle}${article.id}`)
                }
              >
                <Mode color="warning" />
              </Fab>

              <Fab onClick={onRemoveArticle}>
                <Delete color="error" />
              </Fab>
            </div>
          )}
        </div>

        <Image
          alt={article.title}
          className={styles.image}
          height={600}
          src={article.imageUrl}
          width={800}
        />

        <Typography component="p" variant="subtitle1">
          {article.description}
        </Typography>

        <Divider style={{ background: 'var(--primary)' }} />

        <Typography component="p" variant="subtitle1">
          {article.body}
        </Typography>
      </div>
    </Page>
  );
};

export default ArticlePage;
