import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import BenefitsSection from '@/components/benefits-section';
import ContactSection from '@/components/contact-section';
import ServiceSection from '@/components/service-section';
import Service2Section from '@/components/service2-section';
import ReviewsSection from '@/components/reviews-section';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Kyiv LuxeBouquets | Fresh Flowers Delivery',
  description: 'Discover uniquely crafted bouquets and gifts for any occasion',
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
