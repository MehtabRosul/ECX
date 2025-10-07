import { CheckCircle, ShieldCheck, Zap, Code } from 'lucide-react';

const features = [
    {
      icon: ShieldCheck,
      title: 'Post-Quantum Ready',
      description: 'Our algorithms are built to withstand threats from quantum computers.'
    },
    {
      icon: CheckCircle,
      title: 'Fully Audited',
      description: 'Independently audited by top-tier security firms to ensure the highest standards.'
    },
    {
      icon: Code,
      title: 'Immutable Audit Trails',
      description: 'Verifiable, tamper-proof logs for all cryptographic operations and data access.'
    },
    {
      icon: Zap,
      title: 'Blazing Fast',
      description: 'High-performance cryptographic operations with low latency across the globe.'
    }
]

export function Metrics() {
  return (
    <section className="py-12 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">The most comprehensive & powerful platform</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing a platform that is not only secure and compliant, but also performs at scale.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
