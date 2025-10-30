'use client';

import dynamic from 'next/dynamic';

const DynamicFloatingParticlesBackground = dynamic(
  () => import('./floating-particles-background').then(m => m.FloatingParticlesBackground),
  { ssr: false }
);

export function FloatingParticlesBackgroundClient(props: { className?: string; count?: number }) {
  return <DynamicFloatingParticlesBackground {...props} />;
}


