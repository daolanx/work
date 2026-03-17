'use client';

import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const reviews = [
  {
    text: "Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!",
    author: "Ronald Richards",
  },
  {
    text: "The wedding bouquet was absolutely stunning! The team understood exactly what I wanted and delivered beyond my expectations.",
    author: "Sarah Johnson",
  },
  {
    text: "Fresh flowers, fast delivery, and amazing customer service. This is now my go-to flower shop!",
    author: "Michael Chen",
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
              src="/images/reviews/google-logo.svg"
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
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-primary">
            Our Clients say
          </h2>
        </div>

        {/* Slider */}
        <div className="flex flex-col gap-8 items-center w-full max-w-7xl">
          <div className="flex gap-6 items-center w-full">
            {/* Left Arrow */}
            <button
              onClick={scrollPrev}
              className="shrink-0 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity rotate-180"
              aria-label="Previous review"
            >
              <Image
                src="/images/reviews/right-arrow.svg"
                alt="Previous"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </button>

            {/* Review Slide */}
            <div className="flex-1 overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 flex flex-col gap-4 items-center justify-center text-center px-4"
                  >
                    <p className="text-2xl md:text-3xl leading-tight text-primary">
                      <span className="text-3xl">"</span>
                      <span className="italic font-normal">
                        {review.text}
                      </span>
                      <span className="text-3xl">"</span>
                    </p>
                    <p className="text-base font-medium text-primary">
                      – {review.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollNext}
              className="shrink-0 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Next review"
            >
              <Image
                src="/images/reviews/right-arrow.svg"
                alt="Next"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </button>
          </div>

          {/* Slide Nav - Dots */}
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-[7px] h-[7px] rounded-full border border-[muted] transition-colors ${
                  selectedIndex === index ? 'bg-[muted]' : 'bg-transparent hover:bg-[muted]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <button className="h-14 px-6 border border-primary text-base font-medium uppercase tracking-widest text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
          Read reviews
        </button>
      </div>
    </section>
  );
}
