import type { Metadata } from 'next';
import './globals.css';
import AboutSection from './components/about-section';
import BenefitsSection from './components/benefits-section';
import ContactSection from './components/contact-section';
import Footer from './components/footer';
import HeroSection from './components/hero-section';
import Navbar from './components/navbar';
import ReviewsSection from './components/reviews-section';
import ServiceSection from './components/service-section';
import Service2Section from './components/service2-section';

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
