import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Penetration Testing | ECX',
  description: 'Discover how ECX conducts comprehensive penetration testing to identify vulnerabilities and strengthen security postures.',
};

export default function PenetrationTestingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Penetration Testing</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Penetration Testing
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              Penetration testing represents a systematic security assessment methodology where skilled security professionals simulate real-world cyberattacks to identify vulnerabilities, evaluate security controls, and assess the effectiveness of defensive measures before malicious actors can exploit them.
            </p>

            <p>
              At EncryptArx (ECX), penetration testing embodies our proactive approach to security, enabling organizations to discover and remediate vulnerabilities through controlled, ethical hacking exercises that mirror the techniques and methodologies employed by actual attackers. We recognize that comprehensive security requires understanding systems from an attacker's perspective, identifying weaknesses that automated scanning tools may miss.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Conducts Penetration Testing
            </h2>

            <p>
              ECX's penetration testing methodology follows industry-standard frameworks including OWASP, PTES, and NIST guidelines, ensuring comprehensive coverage of security assessment areas. Our testing approach begins with thorough reconnaissance and information gathering, where we collect publicly available information about target systems, identify potential attack surfaces, and map network topologies and application architectures.
            </p>

            <p>
              We employ a combination of automated vulnerability scanning tools and manual testing techniques, recognizing that sophisticated security vulnerabilities often require human expertise to identify and exploit. Our penetration testers utilize advanced exploitation frameworks, custom scripts, and manual testing procedures to identify vulnerabilities that automated tools cannot detect, including business logic flaws, authentication bypass techniques, and complex chained attack vectors.
            </p>

            <p>
              ECX conducts penetration testing across multiple attack vectors including network infrastructure, web applications, mobile applications, cloud environments, and social engineering scenarios. We simulate various attacker profiles and threat models, from opportunistic attackers to sophisticated advanced persistent threats, ensuring that security assessments reflect realistic attack scenarios relevant to each organization's risk profile.
            </p>

            <p>
              Our penetration testing services include comprehensive reporting that details identified vulnerabilities, exploitation techniques, business impact assessments, and prioritized remediation recommendations. We provide clear, actionable guidance that enables organizations to understand security risks and implement effective remediation strategies, transforming security assessment findings into improved security postures.
            </p>

            <p>
              Through our penetration testing expertise, ECX enables organizations to proactively identify and address security vulnerabilities before they can be exploited by malicious actors. We understand that effective security requires continuous assessment and improvement, providing penetration testing services that strengthen security postures while maintaining operational continuity and minimizing business disruption.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Explore our penetration testing services →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

