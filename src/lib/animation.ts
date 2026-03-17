'use client';

import { motion, useReducedMotion } from 'motion/react';

// Animation variants - optimized with will-change
export const fadeInUp = {
  initial: { opacity: 0, y: 20, willChange: 'transform, opacity' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30, willChange: 'transform, opacity' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30, willChange: 'transform, opacity' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95, willChange: 'transform, opacity' },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
};

// Stagger children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Reduced motion variants
export const fadeInUpReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Transition config - optimized for performance
export const transitionConfig = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1], // Smooth easing
};

// Check if user prefers reduced motion
export { useReducedMotion };
