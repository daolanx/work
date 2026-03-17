import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import BenefitsSection from '@/components/BenefitsSection';
import ContactSection from '@/components/ContactSection';
import ServiceSection from '@/components/ServiceSection';
import Service2Section from '@/components/Service2Section';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main >
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
