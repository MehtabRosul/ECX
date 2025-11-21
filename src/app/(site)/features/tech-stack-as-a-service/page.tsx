import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tech Stack as a Service | ECX',
  description: 'Explore how ECX provides comprehensive technology stack solutions as a service, enabling rapid deployment and scalable infrastructure.',
};

export default function TechStackAsAServicePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Tech Stack as a Service</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Tech Stack as a Service
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              Tech Stack as a Service represents a comprehensive approach to technology infrastructure delivery, where organizations receive fully configured, integrated, and maintained technology stacks tailored to their specific business requirements, eliminating the complexity and overhead associated with building and managing complex technology ecosystems internally.
            </p>

            <p>
              At EncryptArx (ECX), Tech Stack as a Service embodies our commitment to simplifying technology adoption while ensuring security, scalability, and operational excellence. We recognize that modern organizations require sophisticated technology infrastructure to compete effectively, but building and maintaining these systems internally can divert critical resources from core business objectives.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Provides Tech Stack as a Service
            </h2>

            <p>
              ECX's Tech Stack as a Service offering begins with comprehensive requirements analysis, where we assess business needs, performance requirements, scalability expectations, and integration requirements. Our team designs custom technology stacks that integrate seamlessly with existing systems while providing the flexibility to adapt to future growth and changing business requirements.
            </p>

            <p>
              We provide fully configured technology stacks that include infrastructure components, development frameworks, database systems, security layers, monitoring tools, and deployment pipelines. Our service encompasses the entire technology lifecycle, from initial setup and configuration through ongoing maintenance, updates, and optimization, ensuring that technology infrastructure remains current, secure, and performant.
            </p>

            <p>
              ECX integrates security as a fundamental component of every technology stack we deliver, implementing defense-in-depth strategies that protect systems at multiple layers. We configure security controls, access management systems, encryption protocols, and monitoring solutions that provide comprehensive protection against threats while maintaining system usability and performance.
            </p>

            <p>
              Our Tech Stack as a Service includes comprehensive documentation, training programs, and ongoing support, enabling organizations to leverage sophisticated technology infrastructure without requiring extensive internal expertise. We maintain responsibility for system updates, security patches, performance optimization, and troubleshooting, allowing clients to focus on their core business activities.
            </p>

            <p>
              Through our Tech Stack as a Service, ECX enables organizations to rapidly deploy sophisticated technology solutions without the complexity, cost, and time investment typically associated with building technology infrastructure from scratch. We understand that technology should serve business objectives rather than consume organizational resources, creating technology stacks that enhance capabilities while minimizing operational overhead.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Learn more about our Tech Stack as a Service →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

