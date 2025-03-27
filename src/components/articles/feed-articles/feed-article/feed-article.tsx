import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography';
import { Article } from '@/types/article';
import { formatDate } from '@/utils/date';
import { routes } from '@/constants/routes';
import styles from './feed-article.module.css';

export const FeedArticle = ({ article }: { article: Article }) => {
  const router = useRouter();

  const href = `${routes.feedArticle}/${article.id}`;

  return (
    <div className={styles.content}>
      <div className={styles.articleImage}>
        <Image
          alt={article.title}
          height={300}
          src={article.imageUrl}
          width={200}
        />
      </div>

      <div className={styles.articleInfo}>
        <Link href={href}>
          <Typography className={styles.clamp} fontWeight={700} variant="h5">
            {article.title}
          </Typography>
        </Link>

        <div className={styles.meta}>
          <Typography variant="caption">{article.authorName}</Typography>

          <div className={styles.divider} />

          <Typography variant="caption">
            {formatDate(article.date as number)}
          </Typography>
        </div>

        <Typography className={styles.clamp} variant="body2">
          {article.description}
        </Typography>

        <Button onClick={() => router.push(href)}>Continue reading</Button>
      </div>
    </div>
  );
};
