'use client';

import { motion, useReducedMotion } from 'motion/react';

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    title: 'Stylish bouquets by florists',
    description:
      'At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. Each bouquet is a unique masterpiece, carefully designed to exceed your expectations.',
  },
  {
    title: 'On-time delivery',
    description:
      'Never miss a moment with our on-time flower delivery service. We understand the importance of timely deliveries, ensuring your beautiful arrangements arrive exactly when you need them, every single time.',
  },
  {
    title: 'Safe payment',
    description:
      'You can feel secure when placing an order with us, as we use industry-standard security measures and encrypted payment processing to protect your personal information and ensure a safe transaction.',
  },
  {
    title: 'Subscription by your needs',
    description:
      'With our subscription service tailored to your specific needs, you can enjoy regular deliveries of fresh, beautiful bouquets at intervals that suit your lifestyle. Perfect for treating yourself or someone special.',
  },
];

function BenefitBlock({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.5,
        delay: index * 0.1,
      }}
      className="border-b  border-primary px-8 py-10 md:px-10 md:py-12 last:border-b-0"
    >
      <h3 className="text-3xl md:text-4xl font-medium leading-tight text-primary mb-4">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-primary-muted">
        {description}
      </p>
    </motion.div>
  );
}

export default function BenefitsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full  mx-auto border-t  border-primary">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - "Why choose us?" Title */}
        <div className="md:w-1/2 md:sticky md:top-[73px] md:h-fit md:flex-shrink-0 ">
          <div className="px-8 py-12 md:px-20 md:py-20">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.6 }}
              className="text-4xl md:text-5xl font-semibold leading-tight text-primary"
            >
              Why choose us?
            </motion.h2>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="md:w-1/2 flex-shrink-0 border-t border-primary md:border-l md:border-t-0">
          {benefits.map((benefit, index) => (
            <BenefitBlock
              key={index}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
