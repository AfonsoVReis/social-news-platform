'use client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';
import { NextPage } from 'next';
import { Page } from '@/components/layout/page';
import { Typography } from '@/components/typography';
import { EditArticleForm } from '@/components/forms/edit-article-form/edit-article-form';
import { routes } from '@/constants/routes';
import { IconButton } from '@/components/icon-button';
import styles from './edit-article.module.css';

const EditArticlePage: NextPage = () => {
  const { id } = useParams();
  const router = useRouter();

  return (
    <Page>
      <div className={styles.content}>
        <IconButton
          className={styles.arrowBack}
          onClick={() => router.push(`${routes.feed}/article/${id}`)}
        >
          <ArrowBack color="primary" />
        </IconButton>

        <Typography gutterBottom variant="h3">
          Edit News Article
        </Typography>

        <EditArticleForm articleId={id as string} />
      </div>
    </Page>
  );
};

export default EditArticlePage;
