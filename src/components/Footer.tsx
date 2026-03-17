'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const shopLinks = [
  'All Products',
  'Fresh Flowers',
  'Dried Flowers',
  'Live Plants',
  'Designer Vases',
  'Aroma Candles',
  'Freshener Diffuser',
];

const serviceLinks = [
  'Flower Subcription',
  'Wedding & Event Decor',
];

const aboutLinks = [
  'Our story',
  'Blog',
  'Shipping & returns',
  'Terms & conditions',
  'Privacy policy',
];

const socialLinks = [
  { name: 'Instagram', icon: '/images/footer/icon-instagram.svg' },
  { name: 'Pinterest', icon: '/images/footer/icon-pinterest.svg' },
  { name: 'Facebook', icon: '/images/footer/icon-facebook.svg' },
  { name: 'Twitter', icon: '/images/footer/icon-twitter.svg' },
  { name: 'Telegram', icon: '/images/footer/icon-telegram.svg' },
];

export default function Footer() {
  return (
    <footer className="w-full  mx-auto border-t border-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-10"
        >
          <div className="flex flex-col gap-6">
            <p className="text-base text-primary leading-relaxed">
              Remember to offer beautiful flowers from Kyiv LuxeBouquets Valentines Day, Mothers Day, Christmas... Reminds you 7 days before. No spam or sharing your address
            </p>
            <div className="flex flex-col gap-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Your Email"
                className="h-14 px-4 border border-muted-light text-sm  placeholder: focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-14 bg-primary text-white text-base font-medium uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Remind
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Column 2: Contact Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-primary"
        >
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium ">
              Contact Us
            </h3>

            <div className="flex flex-col gap-2">
              <p className="text-sm ">Address</p>
              <p className="text-base font-medium text-primary tracking-wide">
                15/4 Khreshchatyk Street, Kyiv
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm ">Phone</p>
              <motion.a
                href="tel:+380980099777"
                whileHover={{ x: 4 }}
                className="text-base font-medium text-primary tracking-wide hover:opacity-70"
              >
                +380980099777
              </motion.a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm ">General Enquiry:</p>
              <motion.a
                href="mailto:Kiev.Florist.Studio@gmail.com"
                whileHover={{ x: 4 }}
                className="text-base font-medium text-primary tracking-wide hover:opacity-70"
              >
                Kiev.Florist.Studio@gmail.com
              </motion.a>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <h4 className="text-xl font-medium ">Follow Us</h4>
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
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
            </div>
          </div>
        </motion.div>

        {/* Column 3: Shop + Service */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-primary"
        >
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium ">Shop</h3>
            <div className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ x: 4 }}
                  className="text-base font-medium text-primary tracking-wide hover:opacity-70"
                >
                  {link}
                </motion.a>
              ))}
            </div>

            <h3 className="text-xl font-medium  pt-4">Service</h3>
            <div className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ x: 4 }}
                  className="text-base font-medium text-primary tracking-wide hover:opacity-70"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Column 4: About Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-primary"
        >
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium ">About Us</h3>
            <div className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ x: 4 }}
                  className="text-base font-medium text-primary tracking-wide hover:opacity-70"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
