import { ContactPageClient } from '@/components/contact/contact-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — EncryptArx',
  description: 'Get in touch: forms hub, direct contacts, and office details.',
};

export default function ContactHubPage() {
  return <ContactPageClient />;
}
