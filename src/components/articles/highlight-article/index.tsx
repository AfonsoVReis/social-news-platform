'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography';
import { UnderlineText } from '@/components/underline-text';
import { routes } from '@/constants/routes';
import { useArticles } from '@/hooks/use-articles';
import { Article } from '@/types/article';
import styles from './highlight-article.module.css';

export const HighlightArticle = () => {
  const { articles } = useArticles();
  const router = useRouter();

  const article = useMemo((): Article => articles && articles[0], [articles]);

  if (!article) {
    return;
  }

  const href = `${routes.feedArticle}/${article.id}`;

  return (
    <div className={styles.content}>
      <div className={styles.articleInfo}>
        <Link href={href}>
          <Typography className={styles.clamp} fontWeight={700} variant="h2">
            <UnderlineText>{article.title}</UnderlineText>
          </Typography>
        </Link>

        <Typography className={styles.clamp} variant="h6">
          {article.description}
        </Typography>

        <Button onClick={() => router.push(href)}>Continue reading</Button>
      </div>

      <div className={styles.articleImage}>
        <Image
          alt={article.title}
          height={800}
          priority
          src={article.imageUrl}
          width={600}
        />
      </div>
    </div>
  );
};
