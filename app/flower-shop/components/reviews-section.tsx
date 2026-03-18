'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface Review {
  text: string;
  author: string;
}

const reviews: Review[] = [
  {
    text: 'Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!',
    author: 'Ronald Richards',
  },
  {
    text: 'The wedding bouquet was absolutely stunning! The team understood exactly what I wanted and delivered beyond my expectations.',
    author: 'Sarah Johnson',
  },
  {
    text: 'Fresh flowers, fast delivery, and amazing customer service. This is now my go-to flower shop!',
    author: 'Michael Chen',
  },
];

export default function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="w-full  mx-auto px-8 md:px-20 py-10 md:py-20">
      <div className="flex flex-col gap-16 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-6 items-center">
          {/* Google Logo + Reviews */}
          <div className="flex flex-col gap-2 items-center">
            <Image
              src="/images/flower-shop/reviews/google-logo.svg"
              alt="Google"
              width={77}
              height={28}
              className="h-7 w-[77px]"
            />
            <p className="text-sm font-medium uppercase text-primary">
              Reviews
            </p>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ willChange: 'opacity, transform' }}
            className="text-4xl md:text-5xl font-semibold leading-tight text-primary"
          >
            Our Clients say
          </motion.h2>
        </div>

        {/* Slider */}
        <div className="flex flex-col gap-8 items-center w-full max-w-7xl">
          <div className="flex gap-6 items-center w-full">
            {/* Left Arrow */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ willChange: 'transform' }}
              onClick={scrollPrev}
              className="shrink-0 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity rotate-180"
              aria-label="Previous review"
            >
              <Image
                src="/images/flower-shop/reviews/right-arrow.svg"
                alt="Previous"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </motion.button>

            {/* Review Slide */}
            <div className="flex-1 overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 flex flex-col gap-4 items-center justify-center text-center px-4"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{ willChange: 'opacity, transform' }}
                      className="text-2xl md:text-3xl leading-tight text-primary"
                    >
                      <span className="text-3xl">&quot;</span>
                      <span className="italic font-normal">{review.text}</span>
                      <span className="text-3xl">&quot;</span>
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      style={{ willChange: 'opacity' }}
                      className="text-base font-medium text-primary"
                    >
                      – {review.author}
                    </motion.p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ willChange: 'transform' }}
              onClick={scrollNext}
              className="shrink-0 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Next review"
            >
              <Image
                src="/images/flower-shop/reviews/right-arrow.svg"
                alt="Next"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </motion.button>
          </div>

          {/* Slide Nav - Dots */}
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <motion.button
                type="button"
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`w-2 h-2 rounded-full border transition-colors ${
                  selectedIndex === index
                    ? 'bg-primary border-primary'
                    : 'border-muted hover:bg-muted'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ willChange: 'opacity, transform' }}
          className="h-14 px-6 border border-primary text-base font-medium uppercase tracking-widest text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
        >
          Read reviews
        </motion.button>
      </div>
    </section>
  );
}
