'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/fade-in';

export default function Service2Section() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full mx-auto relative h-[560px] md:h-[640px] overflow-hidden [clip-path:inset(0)]">
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src="/images/flower-shop/service2/service2-bg.png"
          alt="Wedding & Event Decor"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-10 md:py-20 md:px-20">
        <div className="flex flex-col gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 items-center text-white">
            <FadeIn
              as="p"
              delay={0.3}
              className="text-sm font-medium uppercase tracking-widest"
            >
              service
            </FadeIn>
            <div className="flex flex-col gap-4 items-center">
              <FadeIn
                as="h2"
                delay={0.4}
                className="text-4xl md:text-5xl font-semibold leading-tight text-center"
              >
                Wedding & Event Decor
              </FadeIn>
              <FadeIn
                as="p"
                delay={0.5}
                className="text-lg font-medium leading-relaxed text-center max-w-[586px] opacity-90"
              >
                Let our team of expert florists and designers create stunning,
                on-trend floral décor for your special day. Trust us to bring
                your vision to life.
              </FadeIn>
            </div>
          </div>

          {/* Button */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.5,
              delay: 0.6,
            }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            className="h-14 px-8 border border-white text-sm font-semibold uppercase tracking-[0.2em] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            Inquire Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
