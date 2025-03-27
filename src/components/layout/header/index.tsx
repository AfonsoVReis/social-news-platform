import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher/theme-switcher';
import { UserSession } from '@/components/user-session';
import Logo from '../../../../public/svg/logo.svg';
import styles from './header.module.css';

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.content}>
      <Link href="/">
        <Logo className={styles.logo} />
      </Link>

      <div className={styles.sessionWrapper}>
        <UserSession />

        <ThemeSwitcher />
      </div>
    </div>
  </div>
);
