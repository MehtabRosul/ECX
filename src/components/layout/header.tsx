import Link from 'next/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#', label: 'Services' },
  { href: '#', label: 'Products' },
  { href: '#', label: 'Resources' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'About' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
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
                    <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button size="sm">Sign up</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
