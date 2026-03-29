import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ShopSection from '@/components/ShopSection';
import Recommendations from '@/components/Recommendations';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1440px] mx-auto bg-[#F5F5F5]">
      <Header />
      <Hero />
      <ShopSection />
      <Recommendations />
      <Newsletter />
      <Footer />
    </main>
  );
}
