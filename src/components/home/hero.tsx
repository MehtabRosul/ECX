import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-background bg-dot-pattern bg-repeat [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]" />
      <div className="container relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Your Data&apos;s
            <br />
            <span className="text-primary">Impregnable Citadel</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Build more secure, resilient, and trustworthy applications with EncryptArx's next-generation cryptographic infrastructure and security services.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/contact">Request Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                View Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
