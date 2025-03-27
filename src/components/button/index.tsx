import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import clsx from 'clsx';
import styles from './button.module.css';

type CustomButtonProps = Omit<MuiButtonProps, 'variant'> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({
  className,
  variant = 'primary',
  ...props
}: CustomButtonProps) => (
  <MuiButton
    className={clsx(styles.button, styles[variant], className)}
    variant="contained"
    {...props}
  />
);
