'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode, type ElementType } from 'react';

interface FadeInProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  viewport?: {
    once?: boolean;
    margin?: string;
  };
}

export function FadeIn({
  as,
  children,
  delay = 0,
  className,
  viewport = { once: true },
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (as === 'span') {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay,
        }}
      >
        {children}
      </motion.span>
    );
  }

  if (as === 'p') {
    return (
      <motion.p
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay,
        }}
      >
        {children}
      </motion.p>
    );
  }

  if (as === 'h2') {
    return (
      <motion.h2
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay,
        }}
      >
        {children}
      </motion.h2>
    );
  }

  if (as === 'h3') {
    return (
      <motion.h3
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay,
        }}
      >
        {children}
      </motion.h3>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.5,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
