import { LibraryPageClient } from '@/components/library/library-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library — Research & Resources | EncryptArx',
  description: 'Explore research papers, case studies, articles, books, and industry solutions from EncryptArx. Download, learn, and contribute to our growing knowledge base.',
};

export default function LibraryPage() {
  return <LibraryPageClient />;
}


