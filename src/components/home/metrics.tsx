import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Globe, ShieldCheck, Users } from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border';

const metrics = [
  {
    icon: ShieldCheck,
    value: '99.9%',
    label: 'Uptime SLA',
    description: 'Guaranteed availability for critical infrastructure.',
  },
  {
    icon: Clock,
    value: '<10ms',
    label: 'API Response Time',
    description: 'Blazing fast performance across our global network.',
  },
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Deployments',
    description: 'Trusted by businesses of all sizes, from startups to Fortune 500s.',
  },
  {
    icon: Globe,
    value: '20+',
    label: 'Global Regions',
    description: 'Low-latency access wherever your users are.',
  },
];

const features = [
    {
      icon: CheckCircle,
      title: 'Post-Quantum Ready',
      description: 'Our algorithms are built to withstand threats from quantum computers.'
    },
    {
      icon: CheckCircle,
      title: 'Fully Audited',
      description: 'Independently audited by top-tier security firms.'
    },
    {
      icon: CheckCircle,
      title: 'Developer Friendly APIs',
      description: 'Integrate powerful cryptography with just a few lines of code.'
    },
    {
      icon: CheckCircle,
      title: 'Immutable Audit Trails',
      description: 'Verifiable, tamper-proof logs for all cryptographic operations.'
    }
]

export function Metrics() {
  return (
    <section className="py-12 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Built for Trust and Scale</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing a platform that is not only secure and compliant, but also performs at scale.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.label} className="bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold font-headline">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {features.map((feature, i) => (
              <ShineBorder key={i} color={['#2B8DBE', '#4896BD', '#2B8DBE']}>
                <div className="flex items-start space-x-4 p-4 h-full bg-card/80 backdrop-blur-sm rounded-md">
                    <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                </div>
              </ShineBorder>
            ))}
        </div>
      </div>
    </section>
  );
}
