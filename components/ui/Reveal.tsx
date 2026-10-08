'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: 'up' | 'none';
  as?: 'div' | 'li' | 'span';
};

/** Subtle on-scroll reveal; respects prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, from = 'up', as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y: from === 'up' ? 16 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
