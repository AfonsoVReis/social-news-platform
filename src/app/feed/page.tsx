import { NextPage } from 'next';
import { FeedArticles } from '@/components/articles/feed-articles/feed-articles';
import { HighlightArticle } from '@/components/articles/highlight-article';
import { Page } from '@/components/layout/page';
import styles from './feed.module.css';

const Feed: NextPage = () => (
  <Page>
    <div className={styles.feed}>
      <HighlightArticle />

      <FeedArticles />
    </div>
  </Page>
);

export default Feed;
