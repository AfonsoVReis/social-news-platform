import { NextPage } from 'next';
import { ReactElement } from 'react';
import Image from 'next/image';
import { Link } from '@/components/link';
import { Page } from '@/components/layout/page';
import { Typography } from '@/components/typography';
import { routes } from '@/constants/routes';
import BgImage from '../../public/background-home.png';
import styles from './page.module.css';

const Home: NextPage = (): ReactElement => {
  return (
    <Page>
      <div className={styles.background}>
        <Image
          alt="background-image"
          layout="fill"
          priority
          quality="100"
          src={BgImage}
        />
      </div>

      <div className={styles.content}>
        <Typography
          className={styles.darkText}
          textTransform="uppercase"
          variant="h1"
        >
          read. write. share.
        </Typography>

        <Typography className={styles.darkText} variant="h4">
          <Link href={routes.login} variant="primaryDark">
            Login
          </Link>{' '}
          to begin!
        </Typography>
      </div>
    </Page>
  );
};

export default Home;
