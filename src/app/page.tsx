import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/home/hero';
import { Metrics } from '@/components/home/metrics';
import { Testimonials } from '@/components/home/testimonials';
import { Partners } from '@/components/home/partners';
import { Cta } from '@/components/home/cta';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Partners />
        <Metrics />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
