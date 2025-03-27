import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material';
import clsx from 'clsx';
import styles from './icon-button.module.css';

type IconButtonProps = {
  className?: string;
} & MuiIconButtonProps;

export const IconButton = ({ className, ...props }: IconButtonProps) => (
  <MuiIconButton className={clsx(styles.iconButton, className)} {...props} />
);
