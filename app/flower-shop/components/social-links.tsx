'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface SocialLink {
  name: string;
  href?: string;
  icon: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <div className={`flex gap-8 ${className ?? ''}`}>
      {links.map((social) => (
        <motion.a
          key={social.name}
          href={social.href ?? '#'}
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="w-6 h-6 hover:opacity-70 transition-opacity"
          aria-label={social.name}
        >
          <Image
            src={social.icon}
            alt={social.name}
            width={24}
            height={24}
            unoptimized
            className="w-6 h-6"
          />
        </motion.a>
      ))}
    </div>
  );
}
