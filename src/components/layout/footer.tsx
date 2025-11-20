
'use client';

import Logo from '@/components/logo';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { 
    icon: Github, 
    href: '#', 
    'aria-label': 'GitHub',
    color: 'hover:text-gray-300',
    bgColor: 'hover:bg-gray-300/10'
  },
  { 
    icon: Linkedin, 
    href: '#', 
    'aria-label': 'LinkedIn',
    color: 'hover:text-blue-500',
    bgColor: 'hover:bg-blue-500/10'
  },
  { 
    icon: Instagram, 
    href: '#', 
    'aria-label': 'Instagram',
    color: 'hover:text-pink-400',
    bgColor: 'hover:bg-pink-400/10'
  },
  { 
    icon: Twitter, 
    href: '#', 
    'aria-label': 'Twitter',
    color: 'hover:text-blue-400',
    bgColor: 'hover:bg-blue-400/10'
  },
];

const footerSections = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Terms & Conditions', href: '/legal#terms' },
      { label: 'Cookie Policy', href: '/legal#cookies' },
      { label: 'Compliance', href: '/security' },
      { label: 'Our Team', href: '/about' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Investors', href: '/about' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Cybersecurity', href: '/services' },
      { label: 'Secure Development', href: '/services' },
      { label: 'AI & ML Consultancy', href: '/services' },
      { label: 'Tech Stack as a Service', href: '/services' },
      { label: 'IT Consulting', href: '/services' },
      { label: 'Blockchain', href: '/services' },
      { label: 'Cloud Security', href: '/services' },
      { label: 'Penetration Testing', href: '/services' },
    ],
  },
  {
    title: 'Our Works',
    links: [
      { label: 'Our Services', href: '/services' },
      { label: 'Our Products', href: '/products' },
      { label: 'Resources', href: '/resources' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Our Partners', href: '/partners' },
      { label: 'Case Studies', href: '/clients' },
      { label: 'Portfolio', href: '/clients' },
      { label: 'Success Stories', href: '/testimonials' },
    ],
  },
  {
    title: 'Help Center',
    links: [
      { label: 'Support', href: '/contact' },
      { label: 'FAQs', href: '/blog' },
      { label: 'Privacy & Security Policies', href: '/legal' },
      { label: 'Documentation', href: '/developer' },
      { label: 'API Reference', href: '/developer' },
      { label: 'Community Forum', href: '/library' },
      { label: 'Training & Certification', href: '/resources' },
      { label: 'Contact Support', href: '/contact' },
    ],
  },
];


export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="border-t border-border/40 relative z-20">
      {/* Background overlay to cover page animations */}
      <div className="absolute inset-0 bg-gray-900 -z-0" />
      {/* Top Section - Light Gray */}
      <div className="bg-gray-900 relative z-10">
        <div className="container mx-auto px-4 py-24">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 max-w-7xl mx-auto">
          {/* Company Description Section */}
          <div className="lg:w-1/3 space-y-6">
            <Logo />
            <p className="text-foreground/80 text-base leading-relaxed max-w-md">
              ECX is a deep-tech company focused on cybersecurity and product development. We help businesses protect their digital systems through services like penetration testing, infrastructure hardening, and custom software development. Our goal is to make digital spaces safer and more reliable for everyone we work with.
            </p>
            

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social['aria-label']}
                  href={social.href}
                  className={cn(
                    "relative group p-3 rounded-xl transition-all duration-300",
                    "bg-muted/50 hover:bg-muted border border-border/50",
                    "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
                    social.bgColor,
                    hoveredSocial === social['aria-label'] && "scale-110"
                  )}
                  onMouseEnter={() => setHoveredSocial(social['aria-label'])}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {/* Glow effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                    "bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20",
                    "blur-sm scale-110",
                    hoveredSocial === social['aria-label'] && "opacity-100"
                  )} />
                  
                  {/* Icon */}
                  <social.icon className={cn(
                    "relative h-5 w-5 transition-all duration-300",
                    "text-foreground/60",
                    social.color,
                    hoveredSocial === social['aria-label'] && "scale-110"
                  )} />
                  
                  {/* Tooltip */}
                  <div className={cn(
                    "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1",
                    "bg-foreground text-background text-xs rounded-md opacity-0 transition-opacity duration-200",
                    "pointer-events-none whitespace-nowrap",
                    hoveredSocial === social['aria-label'] && "opacity-100"
                  )}>
                    {social['aria-label']}
                  </div>
                  
                  <span className="sr-only">{social['aria-label']}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="group relative text-sm text-foreground/70 hover:text-primary transition-all duration-200"
                      >
                        <span className="relative z-10">{link.label}</span>
                        {/* Hover underline effect */}
                        <div className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>

      {/* Bottom Section - Dark Black */}
      <div className="bg-black relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-6 text-sm text-foreground/60 max-w-4xl mx-auto">
            <p className="text-center">&copy; {new Date().getFullYear()} ECX, LLP. All rights reserved. | Empowering secure digital futures through advanced cryptography.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
