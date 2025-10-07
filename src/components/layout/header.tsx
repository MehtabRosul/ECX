import Link from 'next/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/library', label: 'Library' },
  { href: '/clients', label: 'Clients' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 pt-10">
                <Link href="/" className="mb-8 flex items-center">
                  <Logo />
                </Link>
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link key={`${link.href}-${link.label}`} href={link.href} className="text-lg font-medium hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact">Request Assessment</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button asChild>
                <Link href="/contact">Request Assessment</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
