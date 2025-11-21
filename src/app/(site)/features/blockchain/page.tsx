import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blockchain | ECX',
  description: 'Learn how ECX leverages blockchain technology to create secure, transparent, and decentralized solutions for modern business challenges.',
};

export default function BlockchainPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Blockchain</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Blockchain
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              Blockchain technology represents a revolutionary distributed ledger system that enables secure, transparent, and immutable record-keeping through cryptographic linking of data blocks, creating decentralized networks that eliminate the need for trusted intermediaries while ensuring data integrity and transaction verifiability.
            </p>

            <p>
              At EncryptArx (ECX), blockchain technology represents a natural extension of our cryptographic expertise, enabling us to build decentralized systems that leverage the inherent security properties of distributed consensus mechanisms. We recognize that blockchain's value extends far beyond cryptocurrency applications, offering transformative potential for supply chain management, digital identity, smart contracts, and transparent record-keeping systems.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Leverages Blockchain Technology
            </h2>

            <p>
              ECX develops blockchain solutions that address real-world business challenges, focusing on practical applications that deliver measurable value. Our blockchain expertise encompasses both public and private blockchain architectures, enabling us to select the most appropriate consensus mechanisms, network topologies, and cryptographic protocols for specific use cases.
            </p>

            <p>
              We design and implement smart contract systems that automate business logic through self-executing code deployed on blockchain networks. Our smart contract development follows rigorous security practices, including comprehensive code audits, formal verification techniques, and extensive testing to ensure that automated contracts function correctly and securely under all conditions.
            </p>

            <p>
              ECX integrates blockchain technology with existing enterprise systems, creating hybrid architectures that leverage blockchain's strengths while maintaining compatibility with traditional infrastructure. We develop APIs, middleware, and integration layers that enable seamless interaction between blockchain networks and conventional databases, applications, and business processes.
            </p>

            <p>
              Our blockchain solutions emphasize security and privacy, implementing advanced cryptographic techniques including zero-knowledge proofs, homomorphic encryption, and secure multi-party computation to protect sensitive data while maintaining blockchain's transparency and verifiability benefits. We design systems that balance the need for transparency with privacy requirements, creating blockchain applications that meet regulatory and business compliance standards.
            </p>

            <p>
              Through our blockchain expertise, ECX enables organizations to leverage decentralized technology for enhanced security, transparency, and operational efficiency. We understand that successful blockchain adoption requires careful consideration of use case suitability, network design, and integration complexity, creating blockchain solutions that deliver practical business value while maintaining security and compliance standards.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Discover our blockchain solutions →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

