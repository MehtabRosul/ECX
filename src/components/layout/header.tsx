
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Briefcase, BookOpen, UserCheck, Mail, User, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChatbotToggle } from '@/components/chatbot/chatbot-toggle';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const { user, profile, signOutUser, loading: authLoading } = useAuth();
  const router = useRouter();

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

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl overflow-y-auto">
                <SheetHeader className="sr-only">
                  <SheetTitle>Site navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col min-h-full">
                  {/* Header with Logo */}
                  <div className="flex items-center justify-between p-6 border-b border-border/20 flex-shrink-0">
                    <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                      <Logo />
                    </Link>
                  </div>
                  
                  {/* Navigation Links */}
                  <nav className="flex-1 px-6 py-8 bg-gradient-to-b from-transparent via-background/30 to-transparent min-h-0">
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
                  
                  {/* Cyra Button - Mobile Only */}
                  <div className="px-6 pb-6 border-t border-border/20 pt-6 flex-shrink-0">
                    <ChatbotToggle
                      className="w-auto mx-auto [&>div]:rounded-3xl [&>div>button]:rounded-3xl [&>div>button]:px-3"
                      enabled={!authLoading && !!user}
                      onClick={() => {
                        router.push('/chatbot');
                        closeMobileMenu();
                      }}
                    />
                  </div>
                  
                  {/* Mobile Auth Buttons */}
                  <div className="p-6 border-t border-border/20 pb-8 flex-shrink-0">
                    {authLoading ? (
                      <div className="flex items-center space-x-3 p-4 bg-background/80 backdrop-blur-sm border border-border/20 rounded-xl">
                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                          <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                        </div>
                      </div>
                    ) : user ? (
                      <>
                        <Link href="/account" onClick={closeMobileMenu}>
                          <div className="flex items-center space-x-3 p-4 bg-background/80 backdrop-blur-sm border border-border/20 rounded-xl hover:border-primary/40 transition-all duration-200">
                            <Avatar className="h-10 w-10 border-2 border-background">
                              {(() => {
                                const gender = profile?.gender;
                                let avatarUrl: string | null = null;
                                if (gender) {
                                  switch (gender.toLowerCase()) {
                                    case 'male':
                                      avatarUrl = 'https://drive.google.com/thumbnail?id=1ccMwtE9lfhMZbViXsdS-f3-xryhI_Z5w&sz=w1000';
                                      break;
                                    case 'female':
                                      avatarUrl = 'https://drive.google.com/thumbnail?id=1ri7CpG9ktmtOG3dBDywbFLmCxXJEPn9x&sz=w1000';
                                      break;
                                    default:
                                      avatarUrl = null;
                                  }
                                }
                                return avatarUrl ? (
                                  <AvatarImage 
                                    src={avatarUrl}
                                    alt={profile?.displayName || user.displayName || 'User'}
                                    key={`mobile-avatar-${profile?.gender || 'default'}`}
                                    className="object-cover"
                                  />
                                ) : null;
                              })()}
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {getInitials(profile?.displayName || user.displayName || user.email)}
                              </AvatarFallback>
                            </Avatar>
                      <div className="flex-1">
                              <p className="font-medium">{profile?.displayName || user.displayName || 'User'}</p>
                              <p className="text-sm text-muted-foreground">{profile?.email || user.email || ''}</p>
                      </div>
                    </div>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full mt-6"
                          onClick={() => {
                            handleSignOut();
                            closeMobileMenu();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/register" onClick={closeMobileMenu} className="w-full block">
                          <button className="group relative w-full px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50">
                            {/* Shimmer effect on hover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            {/* Glow effect */}
                            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
                            <span className="relative z-10">Create account</span>
                          </button>
                        </Link>
                        <Link href="/auth/login" onClick={closeMobileMenu} className="w-full block mt-6">
                          <button className="group relative w-full px-4 py-2 text-sm font-medium rounded-lg border-2 border-border bg-transparent text-foreground overflow-hidden transition-all duration-300 hover:border-primary hover:text-primary">
                            {/* Animated border glow */}
                            <span className="absolute inset-0 rounded-lg border-2 border-primary opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
                            {/* Ripple effect from center */}
                            <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out origin-center" />
                            {/* Fill effect from bottom */}
                            <span className="absolute bottom-0 left-0 right-0 h-0 bg-primary/10 group-hover:h-full transition-all duration-300 ease-out rounded-lg" />
                            {/* Text with subtle lift */}
                            <span className="relative z-10 inline-block group-hover:-translate-y-0.5 transition-transform duration-300">Login</span>
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* DESKTOP NAVBAR - Shows ONLY on screens 1280px and above (true desktop) */}
          <div className="hidden xl:flex items-center space-x-8">
            {/* Desktop Navigation Links - Centered */}
            <nav className="flex items-center space-x-1 mr-12">
              {navLinks.map((link) => (
                <NavLink
                  key={`desktop-${link.href}-${link.label}`}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </nav>
          </div>

          {/* Desktop Auth + Cyra - Right side (absolute positioned) */}
          <div className="hidden xl:flex absolute right-4 items-center gap-4">
            {/* Auth area */}
            {authLoading ? (
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    type="button"
                    className="rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-background ring-primary/20 hover:ring-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="User menu"
                  >
                    <Avatar className="h-10 w-10 border-2 border-background">
                      {(() => {
                        const gender = profile?.gender;
                        let avatarUrl: string | null = null;
                        if (gender) {
                          switch (gender.toLowerCase()) {
                            case 'male':
                              avatarUrl = 'https://drive.google.com/thumbnail?id=1ccMwtE9lfhMZbViXsdS-f3-xryhI_Z5w&sz=w1000';
                              break;
                            case 'female':
                              avatarUrl = 'https://drive.google.com/thumbnail?id=1ri7CpG9ktmtOG3dBDywbFLmCxXJEPn9x&sz=w1000';
                              break;
                            default:
                              avatarUrl = null;
                          }
                        }
                        return avatarUrl ? (
                          <AvatarImage 
                            src={avatarUrl}
                            alt={profile?.displayName || user.displayName || 'User'}
                            key={`header-avatar-${profile?.gender || 'default'}`}
                            className="object-cover"
                          />
                        ) : null;
                      })()}
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {getInitials(profile?.displayName || user.displayName || user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile?.displayName || user.displayName || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile?.email || user.email || ''}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer group relative flex items-center">
                      <User className="mr-2 h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:text-primary" />
                      <span className="relative z-10 transition-colors duration-200 group-hover:text-primary">View Profile</span>
                      <span className="absolute inset-0 bg-primary/20 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 -z-0" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut} 
                    className="cursor-pointer text-destructive focus:text-destructive group relative flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4 transition-all duration-200 group-hover:translate-x-1" />
                    <span className="relative z-10">Logout</span>
                    <span className="absolute inset-0 bg-destructive/20 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 -z-0" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/register">
                  <button className="group relative px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
                    {/* Shimmer effect on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    {/* Glow effect */}
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
                    <span className="relative z-10">Create account</span>
                  </button>
                </Link>
                <Link href="/auth/login">
                  <button className="group relative px-4 py-1.5 text-sm font-medium rounded-lg border-2 border-border bg-transparent text-foreground overflow-hidden transition-all duration-300 hover:border-primary hover:text-primary">
                    {/* Animated border glow */}
                    <span className="absolute inset-0 rounded-lg border-2 border-primary opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
                    {/* Ripple effect from center */}
                    <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out origin-center" />
                    {/* Fill effect from bottom */}
                    <span className="absolute bottom-0 left-0 right-0 h-0 bg-primary/10 group-hover:h-full transition-all duration-300 ease-out rounded-lg" />
                    {/* Text with subtle lift */}
                    <span className="relative z-10 inline-block group-hover:-translate-y-0.5 transition-transform duration-300">Login</span>
                  </button>
                </Link>
              </div>
            )}
            
            {/* Gap between Auth buttons and Cyra */}
            <div className="w-4" />
            
            {/* Cyra button - Rightmost position */}
            <ChatbotToggle enabled={!authLoading && !!user} />
          </div>
        </div>
      </div>
      
      {/* The floating Chatbot component is mounted globally in layout.tsx */}
    </header>
  );
}
