import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export interface FadeInProps {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap | 'div' | 'section' | 'article' | 'header' | 'footer' | 'nav' | 'p' | 'h1' | 'h2' | 'span';
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
  style,
}) => {
  const MotionComponent = useMemo(() => {
    // Uses motion.create for dynamic element tag types per specification
    if (typeof motion.create === 'function') {
      return motion.create(as as any);
    }
    return (motion as any)[as] || motion.div;
  }, [as]);

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};
