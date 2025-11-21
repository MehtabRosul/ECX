import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cybersecurity | ECX',
  description: 'Learn how ECX leverages advanced cybersecurity technologies to protect digital assets and infrastructure.',
};

export default function CybersecurityPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Cybersecurity</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Cybersecurity
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              Cybersecurity represents the foundational pillar of digital protection in our interconnected world, encompassing a comprehensive array of technologies, processes, and practices designed to safeguard networks, systems, and data from unauthorized access, cyberattacks, and malicious exploitation.
            </p>

            <p>
              At EncryptArx (ECX), cybersecurity is not merely a service offering but the core essence of our operational philosophy. We recognize that in an era where digital transformation accelerates at unprecedented rates, the threat landscape evolves with equal velocity. Our approach to cybersecurity integrates cutting-edge cryptographic methodologies, advanced threat intelligence, and proactive defense mechanisms to create multi-layered security architectures that adapt to emerging vulnerabilities.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Leverages Cybersecurity
            </h2>

            <p>
              ECX employs a holistic cybersecurity framework that begins with comprehensive risk assessment and extends through continuous monitoring and incident response. Our team of security experts utilizes advanced penetration testing methodologies to identify vulnerabilities before they can be exploited, implementing zero-trust architectures that verify every access request regardless of its origin.
            </p>

            <p>
              We integrate cryptographic solutions at every layer of the technology stack, ensuring that data remains protected both in transit and at rest. Our cybersecurity services encompass infrastructure hardening, where we systematically strengthen system configurations, patch management protocols, and network segmentation strategies. We deploy advanced threat detection systems that leverage machine learning algorithms to identify anomalous patterns indicative of potential security breaches.
            </p>

            <p>
              ECX's cybersecurity approach extends beyond traditional perimeter defense. We implement application security best practices, conducting thorough code reviews and security audits to identify and remediate vulnerabilities in software development lifecycles. Our security consulting services help organizations establish robust governance frameworks, compliance protocols, and incident response procedures that ensure rapid containment and recovery from security incidents.
            </p>

            <p>
              Through our cybersecurity expertise, ECX enables organizations to build resilient digital infrastructures capable of withstanding sophisticated cyber threats while maintaining operational continuity and regulatory compliance. We understand that effective cybersecurity is not a one-time implementation but a continuous process of assessment, adaptation, and improvement that evolves alongside the threat landscape.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Learn more about our cybersecurity services →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

