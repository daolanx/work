'use client';

import { useState } from 'react';

const menuIcon =
  'https://www.figma.com/api/mcp/asset/b41ee3b8-8c35-4387-bac5-7a82ec86364d';
const cartIcon =
  'https://www.figma.com/api/mcp/asset/469690ab-aedd-4ab2-b152-f19557dbc020';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

const navRightLinks = [
  { label: 'Sign in', href: '/signin' },
  { label: 'Cart', href: '/cart' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="w-full border border-[#121212] border-solid"
      data-name="Navbar"
    >
      {/* Desktop: Full navigation (lg and above) */}
      <div className="hidden lg:flex items-center justify-between">
        {/* Left menu */}
        <div className="flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-center px-6 py-8 border-r border-[#121212] font-medium text-[16px] tracking-[0.4px] text-[#121212] hover:bg-gray-50 transition-colors"
              data-name="Navbar link/button"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Right menu */}
        <div className="flex">
          {navRightLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-center px-6 py-8 border-r border-[#121212] font-medium text-[16px] tracking-[0.4px] text-[#121212] hover:bg-gray-50 transition-colors"
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
            className="flex items-center justify-center p-4 border-r border-[#121212]"
            data-name="Navbar link/button"
            aria-label="Menu"
          >
            <img src={menuIcon} alt="Menu" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex">
          <a
            href="/cart"
            className="flex items-center justify-center p-4 border-l border-[#121212]"
            data-name="Navbar link/button"
            aria-label="Cart"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Mobile: Icons only (below md) */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex">
          <button
            type="button"
            className="flex items-center justify-center p-3 border-r border-[#121212]"
            data-name="Navbar link/button"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <img src={menuIcon} alt="Menu" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex">
          <a
            href="/cart"
            className="flex items-center justify-center p-3 border-l border-[#121212]"
            data-name="Navbar link/button"
            aria-label="Cart"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t border-[#121212]"
          data-name="Mobile menu"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-center px-6 py-4 border-b border-[#121212] font-medium text-[16px] tracking-[0.4px] text-[#121212]"
                data-name="Navbar link/button"
              >
                {link.label}
              </a>
            ))}
            <div className="border-b border-[#121212]" />
            {navRightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-center px-6 py-4 border-b border-[#121212] font-medium text-[16px] tracking-[0.4px] text-[#121212]"
                data-name="Navbar link/button"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
