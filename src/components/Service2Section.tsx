'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

export default function Service2Section() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={containerRef} className="w-full  mx-auto relative h-[560px] md:h-[640px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.8 }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={shouldReduceMotion ? {} : { y }}
          className="absolute inset-0"
        >
          <Image
            src="/images/service2/service2-bg.png"
            alt="Wedding & Event Decor"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-overlay-dark" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.6, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-10 md:py-20 md:px-20"
      >
        <div className="flex flex-col gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 items-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.3 }}
              className="text-sm font-medium uppercase"
            >
              service
            </motion.p>
            <div className="flex flex-col gap-4 items-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl font-semibold leading-tight text-center"
              >
                Wedding & Event Decor
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.5 }}
                className="text-lg font-medium leading-relaxed text-center max-w-[586px]"
              >
                Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life.
              </motion.p>
            </div>
          </div>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.6 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="h-14 px-6 border border-white text-base font-medium uppercase tracking-widest text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
          >
            Inquire Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
