'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { FadeIn } from '@/components/ui/fade-in';

export default function ServiceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full  mx-auto">
      {/* Header - Full Width */}
      <div className="border border-primary px-2.5 py-20">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-primary text-center">
          Our Service
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Image */}
        <div
          className="md:w-1/2 relative aspect-square md:aspect-auto md:h-[560px] border-b md:border-b-0 md:border-r border-primary overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden group">
            <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-110">
              <Image
                src="/images/service/service-bg.png"
                alt="Flower Subscriptions"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-overlay-medium" />
        </div>

        {/* Right Column - Content */}
        <div
          className="md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-10 md:py-20 bg-white"
        >
          <div className="flex flex-col gap-16 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-6 items-center text-center w-full">
              <FadeIn as="p" delay={0.1} className="text-sm font-medium uppercase text-primary">
                service
              </FadeIn>
              <div className="flex flex-col gap-4 w-full">
                <FadeIn as="h3" delay={0.2} className="text-4xl md:text-5xl font-semibold leading-tight text-primary">
                  Flower Subcriptions
                </FadeIn>
                <FadeIn as="p" delay={0.3} className="text-lg font-medium leading-relaxed text-primary-muted">
                  Experience the convenience and savings of regular flower deliveries with our flexible subscription service - up to 30% more profitable than one-time purchases.
                </FadeIn>
              </div>
            </div>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.4 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="h-14 px-6 border border-primary text-base font-medium uppercase tracking-widest text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              Subscribe Now
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
