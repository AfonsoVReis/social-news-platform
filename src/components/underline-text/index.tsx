'use client';
import { ReactNode } from 'react';
import styles from './underline-text.module.css';

export const UnderlineText = ({ children }: { children: ReactNode }) => {
  return <span className={styles.underline}>{children}</span>;
};
