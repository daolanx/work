'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const phoneNumbers = [
  '+380980099777',
  '+380980099111',
];

const socialLinks = [
  { name: 'Instagram', href: '#', icon: '/images/contact/icon-instagram.svg' },
  { name: 'Pinterest', href: '#', icon: '/images/contact/icon-pinterest.svg' },
  { name: 'Facebook', href: '#', icon: '/images/contact/icon-facebook.svg' },
  { name: 'Twitter', href: '#', icon: '/images/contact/icon-twitter.svg' },
  { name: 'Telegram', href: '#', icon: '/images/contact/icon-telegram.svg' },
];

export default function ContactSection() {
  return (
    <section className="w-full  mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="md:w-1/2 flex flex-col">
          {/* Top Block - Title + Form */}
          <div
            className="border-t border-primary px-8 md:px-20 py-10 md:py-20"
          >
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-primary">
              Let's Talk
            </h2>
            <div className="mt-6">
              <p className="text-lg font-medium leading-relaxed text-primary">
                Enter your number and we'll call you back ASAP to help you with any questions or to place an order
              </p>
              <div className=" w-full mt-4 flex flex-col md:flex-row gap-4">
                 <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 border border-muted-light text-sm  placeholder: focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1  bg-primary  text-white text-base font-medium uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                 REACH US
              </motion.button>
                
              </div>
            </div>
          </div>

          {/* Bottom Block - Phone + Address */}
          <div className="flex flex-col md:flex-row border-t border-primary    divide-x divide-primary">
            {/* Phone Column */}
            <div
              className=" bg-white flex-1"
            >
              <div className="border-b border-primary px-4 md:px-2.5 py-4 text-center">
                <h3 className="text-4xl font-medium leading-tight text-primary">
                  Phone
                </h3>
              </div>
              <div className="flex flex-col gap-6 px-6 md:px-6 pt-6 pb-10">
                {phoneNumbers.map((phone) => (
                  <motion.a
                    key={phone}
                    href={`tel:${phone}`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-1 text-base font-semibold tracking-wide text-primary hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/images/contact/icon-call.svg"
                      alt="Phone"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    {phone}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Address Column */}
            <div
              className=" bg-white flex-1 text-center"
            >
              <div className=" border-b border-primary px-4 md:px-2.5 py-4">
                <h3 className="text-4xl font-medium leading-tight text-primary">
                  Address
                </h3>
              </div>
              <div className="flex flex-col gap-5 px-6 md:px-6 pt-6 pb-10">
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  Opening hours: 8 to 11 p.m.
                </p>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-1 text-base font-semibold tracking-wide text-primary hover:opacity-70 transition-opacity"
                >
                  <Image
                    src="/images/contact/icon-location.svg"
                    alt="Location"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  15/4 Khreshchatyk Street, Kyiv
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Background Image + Social */}
        <div
          className="md:w-1/2 relative h-[360px] md:h-auto min-h-[400px]  md:border-l border-primary"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/contact/contact-bg.png"
              alt="Contact background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-overlay-light" />
          </div>

          {/* Follow us */}
          <div className="absolute bottom-0 left-0 right-0 flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white border-t  border-primary px-10 py-4 flex-1 "
            >
              <h3 className="text-4xl font-medium leading-tight text-primary">
                Follow us
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1 bg-white border-t border-l border-r border-primary px-10 py-4 flex items-center justify-between"
            >
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-6 h-6 hover:opacity-70 transition-opacity"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
