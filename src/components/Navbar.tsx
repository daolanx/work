'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const menuIcon =
  'https://www.figma.com/api/mcp/asset/b41ee3b8-8c35-4387-bac5-7a82ec86364d';
const cartIcon =
  'https://www.figma.com/api/mcp/asset/469690ab-aedd-4ab2-b152-f19557dbc020';
const closeIcon =
  'https://www.figma.com/api/mcp/asset/f8fd7f2e-bf82-4057-af51-b2c4d446bcb7';
const instagramIcon =
  'https://www.figma.com/api/mcp/asset/85dd0fa5-eac3-4022-b408-1fad6bbcd74d';
const pinterestIcon =
  'https://www.figma.com/api/mcp/asset/aa260837-977d-4ae7-8829-ed266692a1c5';
const facebookIcon =
  'https://www.figma.com/api/mcp/asset/219e7f20-e04c-413b-ad2d-826cfcd0bb9e';
const twitterIcon =
  'https://www.figma.com/api/mcp/asset/cf7e132c-637b-423a-bc61-953afc7e937e';
const telegramIcon =
  'https://www.figma.com/api/mcp/asset/db42948a-c5f5-4048-ad89-2d3615e37ccb';

// Desktop navigation links (left side)
const desktopNavLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

// Desktop navigation links (right side)
const desktopRightLinks = [
  { label: 'Sign in', href: '/signin' },
  { label: 'Cart', href: '/cart' },
];

// Mobile sheet menu links
const mobileNavLinks = [
  { label: 'Sign in', href: '/signin' },
  { label: 'Shop', href: '/shop' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'About us', href: '/about' },
];

// Footer links in mobile sheet
const footerLinks = [
  { label: 'Shipping & returns', href: '/shipping' },
  { label: 'Terms & conditions', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
];

// Social media links
const socialLinks = [
  { icon: instagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: pinterestIcon, label: 'Pinterest', href: 'https://pinterest.com' },
  { icon: facebookIcon, label: 'Facebook', href: 'https://facebook.com' },
  { icon: twitterIcon, label: 'Twitter', href: 'https://twitter.com' },
  { icon: telegramIcon, label: 'Telegram', href: 'https://telegram.com' },
];

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 bg-white border border-primary border-solid"
      data-name="Navbar"
    >
      {/* Desktop: Full navigation (lg and above) */}
      <div className="hidden lg:flex items-center justify-between">
        {/* Left menu */}
        <div className="flex">
          {desktopNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-center w-[180px] px-6 py-8 border-r border-primary font-medium text-base tracking-wide text-primary hover:bg-gray-50 transition-colors"
              data-name="Navbar link/button"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Right menu */}
        <div className="flex">
          {desktopRightLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-center w-[180px] px-6 py-8 border-l border-primary font-medium text-base tracking-wide text-primary hover:bg-gray-50 transition-colors"
              data-name="Navbar link/button"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Tablet: Icons only (md to lg) */}
      <div className="hidden md:flex lg:hidden items-center justify-between">
        <div className="flex">
          <button
            type="button"
            className="flex items-center justify-center p-4 border-r border-primary"
            data-name="Navbar link/button"
            aria-label="Menu"
          >
            <img src={menuIcon} alt="Menu" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex">
          <a
            href="/cart"
            className="flex items-center justify-center p-4 border-l border-primary"
            data-name="Navbar link/button"
            aria-label="Cart"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Mobile: Sheet menu (below md) */}
      <div className="flex md:hidden items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-center p-3 border-r border-primary"
              data-name="Navbar link/button"
              aria-label="Menu"
            >
              <img src={menuIcon} alt="Menu" className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[384px] border-l border-primary p-0"
            showCloseButton={false}
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center px-4 py-3 border-b border-primary">
                <SheetClose asChild>
                  <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8"
                    aria-label="Close menu"
                  >
                    <img src={closeIcon} alt="Close" className="w-8 h-8" />
                  </button>
                </SheetClose>
              </div>

              {/* Navigation links */}
              {mobileNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center px-6 py-6 border-b border-primary font-medium text-xl text-primary"
                  data-name="Navbar link/button"
                >
                  {link.label}
                </a>
              ))}

              {/* Footer links */}
              <div className="flex flex-col gap-4 px-6 py-6 border-b border-primary">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-medium text-base tracking-wide text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Social media links */}
              <div className="flex items-center justify-between px-6 py-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6"
                    aria-label={social.label}
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="w-6 h-6"
                    />
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex">
          <a
            href="/cart"
            className="flex items-center justify-center p-3 border-l border-primary"
            data-name="Navbar link/button"
            aria-label="Cart"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
}
