import Image from 'next/image';

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
    <section className="w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="md:w-1/2 flex flex-col">
          {/* Top Block - Title + Form */}
          <div className="border-t border-[#121212] px-8 md:px-[80px] py-10 md:py-[80px]">
            <h2 className="text-[40px] md:text-[50px] font-semibold leading-[1.2] text-[#121212]">
              To Contact Us
            </h2>
            <div className="mt-6">
              <p className="text-[18px] font-medium leading-[1.4] text-[#121212]">
                We will call you back
              </p>
              <div className="mt-4 flex flex-col md:flex-row gap-4">
                <input
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                  className="flex-1 h-[56px] px-4 border border-[#d2d2d7] bg-white text-[14px] font-medium text-[#808080] placeholder:text-[#808080] focus:outline-none"
                />
                <button className="flex-1 h-[56px] bg-[#121212] text-white text-[16px] font-medium uppercase tracking-[0.48px] flex items-center justify-center hover:opacity-90 transition-opacity">
                  Book a Call
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Block - Phone + Address */}
          <div className="flex flex-col md:flex-row border-b border-[#121212]">
            {/* Phone Column */}
            <div className="md:w-[360px] bg-white border-b md:border-b-0 md:border-r border-[#121212]">
              <div className="border-t border-b border-[#121212] px-4 md:px-[10px] py-4">
                <h3 className="text-[38px] font-medium leading-[1.2] text-[#121212]">
                  Phone
                </h3>
              </div>
              <div className="flex flex-col gap-6 px-6 md:px-[24px] pt-6 pb-10">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="flex items-center gap-1 text-[16px] font-semibold tracking-[0.4px] text-[#121212] hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/images/contact/icon-call.svg"
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
            <div className="md:w-[360px] bg-white">
              <div className="border-t border-b border-[#121212] px-4 md:px-[10px] py-4">
                <h3 className="text-[38px] font-medium leading-[1.2] text-[#121212]">
                  Address
                </h3>
              </div>
              <div className="flex flex-col gap-5 px-6 md:px-[24px] pt-6 pb-10">
                <p className="text-[14px] font-medium uppercase tracking-wide text-[#121212]">
                  Opening hours: 8 to 11 p.m.
                </p>
                <a
                  href="#"
                  className="flex items-center gap-1 text-[16px] font-semibold tracking-[0.4px] text-[#121212] hover:opacity-70 transition-opacity"
                >
                  <Image
                    src="/images/contact/icon-location.svg"
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
        <div className="md:w-1/2 relative h-[360px] md:h-auto min-h-[400px] border-b md:border-b-0 md:border-l border-[#121212]">
          <div className="absolute inset-0">
            <Image
              src="/images/contact/contact-bg.png"
              alt="Contact background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(18,18,18,0.15)]" />
          </div>

          {/* Follow us */}
          <div className="absolute bottom-0 left-0 right-0 flex">
            <div className="bg-white border-t border-l border-[#121212] px-10 py-4 w-[360px]">
              <h3 className="text-[38px] font-medium leading-[1.2] text-[#121212]">
                Follow us
              </h3>
            </div>
            <div className="flex-1 bg-white border-t border-l border-r border-[#121212] px-10 py-4 flex items-center justify-between">
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
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
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
