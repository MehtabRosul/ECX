import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cloud Security | ECX',
  description: 'Explore how ECX implements comprehensive cloud security strategies to protect cloud-based infrastructure and applications.',
};

export default function CloudSecurityPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Cloud Security</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Cloud Security
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              Cloud security encompasses the comprehensive set of policies, technologies, controls, and practices designed to protect cloud-based infrastructure, applications, and data from threats, vulnerabilities, and unauthorized access while ensuring compliance with regulatory requirements and maintaining operational continuity.
            </p>

            <p>
              At EncryptArx (ECX), cloud security represents a specialized domain where our cryptographic expertise and security engineering capabilities converge to protect organizations' cloud deployments. We recognize that cloud environments introduce unique security challenges including shared responsibility models, multi-tenancy concerns, and the need to secure data across distributed infrastructure.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Implements Cloud Security
            </h2>

            <p>
              ECX's cloud security approach begins with comprehensive cloud security assessments, where we evaluate cloud configurations, access controls, data encryption, network security, and compliance postures. We conduct thorough reviews of cloud infrastructure deployments, identifying misconfigurations, security gaps, and compliance violations that could expose organizations to risks.
            </p>

            <p>
              We implement zero-trust security architectures for cloud environments, ensuring that every access request is authenticated, authorized, and encrypted regardless of its origin. Our cloud security strategies include identity and access management solutions, network segmentation, encryption at rest and in transit, and comprehensive logging and monitoring systems that provide visibility into cloud security events.
            </p>

            <p>
              ECX specializes in securing multi-cloud and hybrid cloud deployments, where organizations leverage multiple cloud providers or combine cloud and on-premises infrastructure. We develop unified security policies and management frameworks that maintain consistent security postures across diverse cloud environments while addressing the unique security considerations of each platform.
            </p>

            <p>
              Our cloud security services encompass cloud-native security tools and services, including cloud security posture management, cloud workload protection, and cloud access security brokers. We help organizations leverage cloud providers' native security capabilities while implementing additional security layers that address specific business requirements and compliance obligations.
            </p>

            <p>
              Through our cloud security expertise, ECX enables organizations to confidently adopt cloud technologies while maintaining robust security postures that protect sensitive data and critical applications. We understand that effective cloud security requires continuous monitoring, regular assessments, and adaptive security strategies that evolve alongside cloud deployments and emerging threats.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Learn more about our cloud security services →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

