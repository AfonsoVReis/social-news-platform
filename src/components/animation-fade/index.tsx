import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimationFade = {
  children: ReactNode;
  className?: string;
};

export const AnimationFade = ({ children, ...props }: AnimationFade) => (
  <motion.div
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
);
