'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full  mx-auto border-t border-primary">
      <div className="flex flex-col md:flex-row ">
        {/* Left Side - "About us" Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.6 }}
          className="flex-1 md:sticky md:top-[73px] md:h-fit md:flex-shrink-0  "
        >
          <div className="px-8 py-12 md:px-20 md:py-20">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-primary">
              About us
            </h2>
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <div
          className="flex-1  flex-shrink-0 border-t border-primary md:border-l md:border-t-0"
        >
          <div className="px-8 py-12 md:px-20 md:py-20 flex flex-col gap-16">
            {/* Text Content */}
            <div className="flex flex-col gap-6">
              {/* Overline Label */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.1 }}
                className="text-sm font-medium leading-tight uppercase text-primary"
              >
                Our story
              </motion.span>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-medium leading-tight text-primary"
              >
                Kyiv LuxeBouquets
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.3 }}
                className="text-base leading-relaxed text-primary-muted"
              >
                We are a modern local floral studio, which specializes in the design and delivery of unique bouquets. We have the best florists who carefully select each look, our studio cooperates directly with farms for growing different flowers, so we always have fresh flowers, which are collected by our florists in exquisite bouquets. We have a collection of fresh bouquets, collections of dried bouquets, house plants, as well as fragrant candles from luxury brands to create the perfect atmosphere. Make someone's day amazing by sending flowers, plants and gifts the same or next day. Ordering flowers online has never been easier.
              </motion.p>
            </div>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.4 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="w-[175px] h-14 border border-primary px-6 py-4 text-base font-medium uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Learn more
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
