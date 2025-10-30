
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Briefcase, BookOpen, UserCheck, Mail, Bot } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChatbotToggle } from '@/components/chatbot/chatbot-toggle';
import { MobileChatbotToggle } from '@/components/chatbot/mobile-chatbot-toggle';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/about', label: 'About', icon: BookOpen },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/products', label: 'Products', icon: BookOpen },
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/rnd', label: 'R&D', icon: BookOpen },
  { href: '/careers', label: 'Careers', icon: UserCheck },
  { href: '/contact', label: 'Contact', icon: Mail },
];

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  isMobile?: boolean;
  onClick?: () => void;
}

function NavLink({ href, label, icon: Icon, isMobile = false, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href !== '#' && (pathname === href || pathname.startsWith(href + '/'));
  if (isMobile) {
    return (
      <Link 
        href={href} 
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-colors duration-200 ${
          isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
        }`}
      >
        {Icon && <Icon className="h-5 w-5 text-foreground/60" />}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`group relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
        isActive ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
      }`}
    >
      {label}
      <div className={`absolute bottom-0 left-3 right-3 h-px transition-all duration-200 ${
        isActive ? 'bg-primary' : 'bg-transparent group-hover:bg-primary'
      }`} />
    </Link>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      "border-b border-border/50",
      "bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
      isScrolled && "bg-background/95 shadow-sm"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-center relative">
          {/* Logo - Left side (absolute positioned) */}
          <Link href="/" className="absolute left-4 flex items-center">
            <Logo />
          </Link>

          {/* MOBILE/TABLET NAVBAR - Shows on all screens up to 1279px (including iPad Pro) */}
          <div className="xl:hidden absolute right-4 flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl">
                <SheetHeader className="sr-only">
                  <SheetTitle>Site navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  {/* Header with Logo */}
                  <div className="flex items-center justify-between p-6 border-b border-border/20">
                    <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                      <Logo />
                    </Link>
                  </div>
                  
                  {/* Navigation Links */}
                  <nav className="flex-1 px-6 py-8 bg-gradient-to-b from-transparent via-background/30 to-transparent">
                    <div className="space-y-1">
                      {navLinks.map((link) => (
                        <NavLink
                          key={`mobile-${link.href}-${link.label}`}
                          href={link.href}
                          label={link.label}
                          icon={link.icon}
                          isMobile={true}
                          onClick={closeMobileMenu}
                        />
                      ))}
                    </div>
                  </nav>
                  
                  {/* AI Assistant Button */}
                  <div className="p-6 border-t border-border/20 bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex items-center space-x-3 p-4 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/40 transition-all duration-200">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <MobileChatbotToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* DESKTOP NAVBAR - Shows ONLY on screens 1280px and above (true desktop) */}
          <div className="hidden xl:flex items-center space-x-8">
            {/* Desktop Navigation Links - Centered */}
            <nav className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={`desktop-${link.href}-${link.label}`}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </nav>
          </div>

          {/* Desktop AI Assistant - Right side (absolute positioned) */}
          <div className="hidden xl:flex absolute right-4 items-center">
            <ChatbotToggle />
          </div>
        </div>
      </div>
      
      {/* The floating Chatbot component is mounted globally in layout.tsx */}
    </header>
  );
}
