'use client';

import Image from 'next/image';
import { SocialLinks } from '@/components/ui/social-links';

const phoneNumbers = [
  '+380980099777',
  '+380980099111',
];

const socialLinks = [
  { name: 'Instagram', href: '#', icon: '/images/flower-shop/contact/icon-instagram.svg' },
  { name: 'Pinterest', href: '#', icon: '/images/flower-shop/contact/icon-pinterest.svg' },
  { name: 'Facebook', href: '#', icon: '/images/flower-shop/contact/icon-facebook.svg' },
  { name: 'Twitter', href: '#', icon: '/images/flower-shop/contact/icon-twitter.svg' },
  { name: 'Telegram', href: '#', icon: '/images/flower-shop/contact/icon-telegram.svg' },
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
                 <input
                type="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="h-14 flex-1 px-4 border border-muted-light text-base focus:outline-none"
              />
              <button
                type="submit"
                className="h-14  flex-1  bg-primary  text-white text-base font-medium uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                 REACH US
              </button>

              </div>
            </div>
          </div>

          {/* Bottom Block - Phone + Address */}
          <div className="flex flex-col md:flex-row border-t border-primary    divide-x divide-primary">
            {/* Phone Column */}
            <div
              className=" bg-white flex-1  text-center"
            >
              <div className="border-b border-primary px-4 md:px-2.5 py-4">
                <h3 className="text-4xl font-medium leading-tight ">
                  Phone
                </h3>
              </div>
              <div className="py-6 px-4 flex flex-col justify-center items-center gap-4">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="flex items-center justify-center w-full gap-2 text-base font-semibold tracking-wide text-primary hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/images/flower-shop/contact/icon-call.svg"
                      alt="Phone"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    {phone}
                  </a>
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
              <div className="py-6 px-4 flex flex-col justify-center items-center gap-4">
                <p className="text-sm font-medium uppercase tracking-wide text-primary text-center">
                  Opening hours: 8 to 11 p.m.
                </p>
                <a
                  href="#"
                  className="flex items-center justify-center gap-1 text-base font-semibold tracking-wide text-primary hover:opacity-70 transition-opacity"
                >
                  <Image
                    src="/images/flower-shop/contact/icon-location.svg"
                    alt="Location"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  15/4 Khreshchatyk Street, Kyiv
                </a>
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
              src="/images/flower-shop/contact/contact-bg.png"
              alt="Contact background"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-overlay-light" />
          </div>

          {/* Follow us */}
          <div className="absolute bottom-0 left-0 right-0 flex">
            <div
            
              className="bg-white border-t  border-primary px-10 py-4 flex-1 "
            >
              <h3 className="text-4xl font-medium leading-tight text-primary">
                Follow us
              </h3>
            </div>
            <div
             
              className="flex-1 bg-white border-t border-l border-r border-primary px-10 py-4 flex items-center justify-between"
            >
              <SocialLinks links={socialLinks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
