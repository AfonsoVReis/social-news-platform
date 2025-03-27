import { ButtonBase, Typography } from '@mui/material';
import clsx from 'clsx';
import styles from './tag.module.css';

type TagProps = {
  isActive?: boolean;
  className?: string;
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: (event: any) => void;
};

export const Tag = ({
  className,
  isActive,
  label,
  onClick,
  variant = 'primary',
}: TagProps) => (
  <ButtonBase
    className={clsx(
      styles.tag,
      styles[variant],
      { [styles.active]: isActive },
      className,
    )}
    disabled={!onClick}
    onClick={onClick}
  >
    <Typography fontWeight={600} variant="body2">
      {label}
    </Typography>
  </ButtonBase>
);
