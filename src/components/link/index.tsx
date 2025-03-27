'use client';
import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';
import clsx from 'clsx';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import styles from './link.module.css';

type CustomVariant = 'primary' | 'secondary' | 'primaryDark';

interface CustomLinkProps extends Omit<MUILinkProps, 'variant'> {
  href: string;
  variant?: CustomVariant;
}

const LinkWrapper = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ ...props }, ref) => <NextLink ref={ref} {...props} />,
);

LinkWrapper.displayName = 'NextLink';

export const Link = ({
  className,
  variant = 'primary',
  ...props
}: CustomLinkProps) => (
  <MUILink
    className={clsx(styles.link, styles[variant], className)}
    component={LinkWrapper}
    {...props}
  />
);
