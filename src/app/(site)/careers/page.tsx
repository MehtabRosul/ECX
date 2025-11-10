import { CareersPageClient } from '@/components/careers/careers-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers — EncryptArx',
  description: 'Join EncryptArx and build your career with us. Explore open positions, benefits, culture, and our hiring process.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
