'use client';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { AnimationFade } from '@/components/animation-fade';
import styles from './page.module.css';

export const Page = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <AnimationFade className={clsx(styles.page, className)}>
    {children}
  </AnimationFade>
);
