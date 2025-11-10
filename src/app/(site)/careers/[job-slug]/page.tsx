import { JobDetailClient } from '@/components/careers/job-detail-client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = { params: Promise<{ "job-slug": string }> };

const jobTitles: Record<string, string> = {
  'motion-graphics-designer': 'Motion Graphics Designer',
  'python-ml-developer': 'Python (Machine Learning) Developer',
  'technical-sales-representative-intern': 'Technical Sales Representative Intern',
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const jobTitle = jobTitles[resolvedParams['job-slug']];
  
  if (!jobTitle) {
    return {
      title: 'Job Not Found — EncryptArx',
      description: 'The requested job position could not be found.',
    };
  }

  return {
    title: `${jobTitle} — Careers | EncryptArx`,
    description: `Apply for the ${jobTitle} position at EncryptArx. Join our team and build your career with us.`,
  };
}

export default async function JobDetailPage({ params }: Params) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.['job-slug']) return notFound();
  
  const jobSlug = resolvedParams['job-slug'];
  
  // Validate job slug
  if (!jobTitles[jobSlug]) {
    return notFound();
  }

  return <JobDetailClient jobSlug={jobSlug} />;
}
