import Image from 'next/image';

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
    <footer className="w-full max-w-[1440px] mx-auto border-t border-[#121212]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Newsletter */}
        <div className="p-8 md:p-10">
          <div className="flex flex-col gap-6">
            <p className="text-[16px] text-[#121212] leading-[1.4]">
              Remember to offer beautiful flowers from Kyiv LuxeBouquets Valentines Day, Mothers Day, Christmas... Reminds you 7 days before. No spam or sharing your address
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your Email"
                className="h-[56px] px-4 border border-[#d2d2d7] text-[14px] text-[#808080] placeholder:text-[#808080] focus:outline-none"
              />
              <button className="h-[56px] bg-[#121212] text-white text-[16px] font-medium uppercase tracking-[0.48px] flex items-center justify-center hover:opacity-90 transition-opacity">
                Remind
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Contact Us */}
        <div className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-[#121212]">
          <div className="flex flex-col gap-6">
            <h3 className="text-[21px] font-medium text-[#808080]">
              Contact Us
            </h3>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#808080]">Address</p>
              <p className="text-[16px] font-medium text-[#121212] tracking-[0.4px]">
                15/4 Khreshchatyk Street, Kyiv
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#808080]">Phone</p>
              <a href="tel:+380980099777" className="text-[16px] font-medium text-[#121212] tracking-[0.4px] hover:opacity-70">
                +380980099777
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#808080]">General Enquiry:</p>
              <a href="mailto:Kiev.Florist.Studio@gmail.com" className="text-[16px] font-medium text-[#121212] tracking-[0.4px] hover:opacity-70">
                Kiev.Florist.Studio@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <h4 className="text-[21px] font-medium text-[#808080]">Follow Us</h4>
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href="#"
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

        {/* Column 3: Shop + Service */}
        <div className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-[#121212]">
          <div className="flex flex-col gap-6">
            <h3 className="text-[21px] font-medium text-[#808080]">Shop</h3>
            <div className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[16px] font-medium text-[#121212] tracking-[0.4px] hover:opacity-70"
                >
                  {link}
                </a>
              ))}
            </div>

            <h3 className="text-[21px] font-medium text-[#808080] pt-4">Service</h3>
            <div className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[16px] font-medium text-[#121212] tracking-[0.4px] hover:opacity-70"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 4: About Us */}
        <div className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-[#121212]">
          <div className="flex flex-col gap-6">
            <h3 className="text-[21px] font-medium text-[#808080]">About Us</h3>
            <div className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[16px] font-medium text-[#121212] tracking-[0.4px] hover:opacity-70"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
