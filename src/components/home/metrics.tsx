
import { CheckCircle, ShieldCheck, Zap, Code, Users, BookOpen, Clock } from 'lucide-react';
import FadeContent from '../ui/fade-content';

const features = [
    {
      icon: ShieldCheck,
      title: 'Audits Completed',
      metric: '128',
      description: 'Ensuring your systems are secure and compliant.'
    },
    {
      icon: Zap,
      title: 'Threats Mitigated',
      metric: '1.2M',
      description: 'Actively protecting against a wide range of threats.'
    },
    {
      icon: BookOpen,
      title: 'Research Papers',
      metric: '42',
      description: 'Contributing to the forefront of security innovation.'
    },
    {
      icon: Code,
      title: 'Active Installs',
      metric: '54k',
      description: 'Trusted by thousands of developers worldwide.'
    },
    {
        icon: Users,
        title: 'Partners',
        metric: '18',
        description: 'Collaborating with industry-leading organizations.'
    },
    {
        icon: Clock,
        title: 'Avg API Latency',
        metric: '28ms',
        description: 'Delivering high-performance cryptographic operations.'
    }
]

export function Metrics() {
  return (
    <section className="py-12 sm:py-24 bg-surface-1">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
                <FadeContent key={i} delay={i * 150}>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-surface-2 shadow-soft hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-glass-01 mb-4">
                            <feature.icon className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted uppercase tracking-wider">{feature.title}</p>
                        <p className="text-4xl font-bold text-primary my-2">{feature.metric}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                </FadeContent>
            ))}
        </div>
      </div>
    </section>
  );
}
