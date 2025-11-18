import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ChatProvider } from '@/context/chat-context';
import { AuthProvider } from '@/contexts/AuthContext';
import { Chatbot } from '@/components/chatbot/chatbot';
import { MobileChatbot } from '@/components/chatbot/mobile-chatbot';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'ECX',
  description: 'Advanced cryptographic solutions for a secure digital world.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <Script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <ChatProvider>
            <Header />
            {children}
            <Footer />
            {/* Desktop Chatbot - Only shows on screens 1280px and above */}
            <div className="hidden xl:block">
              <Chatbot />
            </div>
            {/* Mobile Chatbot - Only shows on screens below 1280px */}
            <div className="xl:hidden">
              <MobileChatbot />
            </div>
          </ChatProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
