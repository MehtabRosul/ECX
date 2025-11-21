import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Secure Development | ECX',
  description: 'Discover how ECX implements secure development practices to build resilient and protected software solutions.',
};

export default function SecureDevelopmentPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Secure Development</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Secure Development
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              Secure development represents a systematic approach to software engineering that integrates security considerations throughout the entire development lifecycle, from initial design and architecture through coding, testing, deployment, and maintenance phases.
            </p>

            <p>
              At EncryptArx (ECX), secure development is embedded into our core engineering practices, recognizing that security cannot be effectively retrofitted into applications after they have been built. We understand that vulnerabilities introduced during development phases represent the most significant source of security risks in production environments, making proactive security integration essential for building resilient software systems.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Implements Secure Development
            </h2>

            <p>
              ECX's secure development methodology begins with threat modeling and security architecture design, where we identify potential attack vectors and design systems with security as a fundamental requirement rather than an afterthought. Our development teams follow secure coding standards that prevent common vulnerabilities such as SQL injection, cross-site scripting, authentication bypass, and insecure direct object references.
            </p>

            <p>
              We integrate automated security testing tools into our continuous integration and continuous deployment pipelines, enabling real-time vulnerability detection during the development process. Our code review processes include dedicated security assessments where experienced security engineers examine code for potential weaknesses, ensuring that security best practices are consistently applied across all development projects.
            </p>

            <p>
              ECX maintains comprehensive security training programs for our development teams, ensuring that engineers remain current with emerging threats, attack techniques, and defensive coding practices. We utilize static application security testing (SAST) and dynamic application security testing (DAST) tools to identify vulnerabilities at different stages of development, complementing automated analysis with manual security reviews.
            </p>

            <p>
              Our secure development practices extend to dependency management, where we maintain strict controls over third-party libraries and frameworks, regularly scanning for known vulnerabilities and ensuring timely updates. We implement secure configuration management practices that prevent sensitive credentials and configuration data from being exposed in code repositories or deployment artifacts.
            </p>

            <p>
              Through our secure development approach, ECX delivers software solutions that are inherently more resilient to attacks, reducing the risk of security incidents and minimizing the cost and complexity of post-deployment security remediation. We recognize that secure development is an investment in long-term system reliability and user trust, creating applications that protect both organizational assets and end-user data.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Explore our secure development services →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

