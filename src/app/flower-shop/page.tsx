import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/flower-shop/components/navbar';
import HeroSection from '@/app/flower-shop/components/hero-section';
import AboutSection from '@/app/flower-shop/components/about-section';
import BenefitsSection from '@/app/flower-shop/components/benefits-section';
import ContactSection from '@/app/flower-shop/components/contact-section';
import ServiceSection from '@/app/flower-shop/components/service-section';
import Service2Section from '@/app/flower-shop/components/service2-section';
import ReviewsSection from '@/app/flower-shop/components/reviews-section';
import Footer from '@/app/flower-shop/components/footer';

export const metadata: Metadata = {
  title: 'Kyiv LuxeBouquets — Fresh Flowers Delivery in Kyiv',
  description:
    'Discover uniquely crafted bouquets and gifts for any occasion. Order online for fresh flower delivery, plants, and aroma candles in Kyiv.',
  keywords: [
    'fresh flowers Kyiv',
    'flower delivery',
    'online flower shop',
    'bouquet delivery',
    'wedding flowers',
    'flower subscription',
  ],
  openGraph: {
    title: 'Kyiv LuxeBouquets — Fresh Flowers Delivery in Kyiv',
    description:
      'Discover uniquely crafted bouquets and gifts for any occasion. Order online for fresh flower delivery, plants, and aroma candles in Kyiv.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FlowerShopPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <ContactSection />
      <ServiceSection />
      <Service2Section />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
