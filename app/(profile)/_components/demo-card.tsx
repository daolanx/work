'use client';

import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { MagicCard } from '@/components/ui/magic-card';

interface DemoCardProps {
  children: ReactNode;
}

export function DemoCard({ children }: DemoCardProps) {
  const { theme } = useTheme();

  return (
    <MagicCard
      className="group bg-white dark:bg-neutral-900 overflow-hidden rounded-sm"
      gradientColor={theme === 'dark' ? '#262626' : '#f5f5f5'}
      gradientFrom={theme === 'dark' ? '#737373' : '#a3a3a3'}
      gradientTo={theme === 'dark' ? '#a3a3a3' : '#d4d4d4'}
    >
      {children}
    </MagicCard>
  );
}
