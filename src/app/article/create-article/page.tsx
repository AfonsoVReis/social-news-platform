import { NextPage } from 'next';
import { CreateArticleForm } from '@/components/forms/create-article-form/create-article-form';
import { Page } from '@/components/layout/page';
import { Typography } from '@/components/typography';
import styles from './create-article.module.css';

const CreateArticlePage: NextPage = () => (
  <Page>
    <div className={styles.content}>
      <Typography gutterBottom variant="h3">
        Submit News Article
      </Typography>

      <CreateArticleForm />
    </div>
  </Page>
);

export default CreateArticlePage;
