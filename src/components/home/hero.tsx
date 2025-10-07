import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-background bg-dot-pattern bg-repeat [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]" />
      <div className="container relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Next-Generation
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent"> Cryptography </span>
            Solutions
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            EncryptArx provides cutting-edge cryptographic infrastructure and security services to protect your most valuable digital assets.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
