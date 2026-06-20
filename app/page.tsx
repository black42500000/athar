import LoadingScreen from '@/components/loading-screen';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ProductsSection from '@/components/products-section';
import AboutSection from '@/components/about-section';
import FeaturesSection from '@/components/features-section';
import TestimonialsSection from '@/components/testimonials-section';
import OrderSection from '@/components/order-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black-main selection:bg-gold/30 selection:text-gold-light">
      <LoadingScreen />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <OrderSection />
      <Footer />
    </main>
  );
}
