import { useState, useEffect } from 'react';
import TopBar from './layout/TopBar';
import Header from './layout/Header';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import ProductsSection from './sections/ProductsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './layout/Footer';
import FloatingButtons from './ui/FloatingButtons';

export default function GarageWebsite() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header isScrolled={isScrolled} />
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
        </div>
  );
}