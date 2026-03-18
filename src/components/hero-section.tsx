'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';

// Types
type Category = {
  id: number;
  label: string;
  image: string;
  imageFirst: boolean;
};

// Data
const categories: Category[] = [
  { id: 1, label: 'Fresh Flowers', image: '/images/hero/fresh-flowers.jpg', imageFirst: false },
  { id: 2, label: 'Live Plants', image: '/images/hero/live-plants.jpg', imageFirst: true },
  { id: 3, label: 'Dried Flowers', image: '/images/hero/dried-flowers.jpg', imageFirst: false },
  { id: 4, label: 'Fresheners', image: '/images/hero/fresheners.jpg', imageFirst: true },
  { id: 5, label: 'Aroma Candels', image: '/images/hero/aroma-candles.jpg', imageFirst: false },
];

// Constants
const BORDER_OVERLAP = 'ml-[-1px] mt-[-1px] mb-[-1px]';
const ANIMATION_DURATION = { fast: 0.3, normal: 0.6 };

// Icons
const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d={direction === 'left' ? 'M19 12H5M5 12L12 19M5 12L12 5' : 'M5 12H19M19 12L12 5M19 12L12 19'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Components
function CategoryCard({ category }: { category: Category }) {
  return (
    <div className={cn('flex group', category.imageFirst && 'flex-row-reverse')}>
      {/* Text Side */}
      <div className={cn('w-1/2 flex flex-col items-center aspect-square ', 'border-l border-t border-primary')}>
        <div className=" text-4xl font-medium leading-tight  justify-center m-auto">
          {category.label}
        </div>
       
        <a className="flex  gap-1 justify-end mb-6  font-semibold tracking-wide text-primary">
          <span className={cn(
            'transition-transform duration-300',
            category.imageFirst ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
          )}>
            {category.imageFirst && <ArrowIcon direction="left" />}
          </span>
          Shop now
          <span className={cn(
            'transition-transform duration-300',
            category.imageFirst ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
          )}>
            {!category.imageFirst && <ArrowIcon direction="right" />}
          </span>
        </a>
      </div>

      {/* Image Side */}
      <div className={cn('w-1/2 aspect-square relative overflow-hidden ', 'border-l border-t border-primary')}>
        <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105">
          <Image src={category.image} alt={category.label} fill sizes="50vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const animationDuration = shouldReduceMotion ? ANIMATION_DURATION.fast : ANIMATION_DURATION.normal;

  return (
    <section className="w-full mx-auto">
      <div className="flex flex-col lg:flex-row divide-x divide-primary">
        {/* Left Section */}
        <div className="flex-1  lg:sticky lg:top-[73px]  ">
          <div className='p-20'>
          <div
            className=" py-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration }}
              style={{ willChange: 'opacity, transform' }}
              className="text-4xl lg:text-6xl font-semibold leading-tight tracking-tight text-primary"
            >
              Kyiv LuxeBouquets<sup className="text-2xl lg:text-4xl font-medium ml-1">®</sup>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: 0.1 }}
              style={{ willChange: 'opacity, transform' }}
              className="mt-4 text-base lg:text-lg text-primary-muted leading-relaxed"
            >
              Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our{' '}
              <span className="italic">Online Flower</span>{' '}
              <span className="italic">Delivery Service</span>
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row pt-6 border-t border-primary">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: animationDuration, delay: 0.2 }}
              style={{ willChange: 'opacity, transform' }}
              className="w-full lg:w-1/2 overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden group">
                <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105 ">
                  <Image src="/images/hero/hero.jpg" alt="Hero flowers" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <div
              className="w-full lg:w-1/2 flex items-end  md:ml-6  md:border-l border-primary"
            >
              <div className="px-4 lg:px-6">
                <p className="text-sm text-primary-muted leading-tight ">
                  Experience the joy of giving with our modern floral studio. Order online and send fresh flowers, plants and gifts today.
                </p>
              </div>
            </div>
          </div>

          </div>
       
        </div>

        {/* Right Section - Categories */}
        <div className="flex-1 ml-[-1px] mt-[-1px] ">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
