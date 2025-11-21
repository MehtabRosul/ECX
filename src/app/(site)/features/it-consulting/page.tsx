import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'IT Consulting | ECX',
  description: 'Discover how ECX provides strategic IT consulting services to optimize technology infrastructure and drive digital transformation.',
};

export default function ITConsultingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">IT Consulting</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            IT Consulting
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              IT consulting encompasses strategic guidance and technical expertise that helps organizations optimize their technology infrastructure, align IT initiatives with business objectives, and navigate the complexities of digital transformation while maximizing return on technology investments.
            </p>

            <p>
              At EncryptArx (ECX), IT consulting represents a holistic approach to technology strategy that combines deep technical expertise with business acumen, enabling organizations to make informed decisions about technology adoption, infrastructure optimization, and digital innovation. We recognize that effective IT strategy requires understanding not only current technology capabilities but also emerging trends, business requirements, and competitive landscapes.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Delivers IT Consulting
            </h2>

            <p>
              ECX's IT consulting services begin with comprehensive technology assessments, where we analyze existing infrastructure, identify inefficiencies, evaluate security postures, and assess alignment with business objectives. Our consultants work closely with stakeholders to understand organizational goals, operational requirements, and strategic priorities, ensuring that technology recommendations support broader business strategies.
            </p>

            <p>
              We provide strategic technology roadmaps that outline recommended technology investments, migration strategies, and implementation timelines. Our consulting approach considers factors including cost optimization, risk mitigation, scalability requirements, and integration complexity, enabling organizations to make technology decisions that balance immediate needs with long-term strategic objectives.
            </p>

            <p>
              ECX's IT consulting encompasses architecture design, where we develop technology blueprints that define system structures, integration patterns, and deployment strategies. We help organizations design scalable, secure, and maintainable technology architectures that support current operations while providing flexibility for future growth and adaptation.
            </p>

            <p>
              Our consulting services extend to technology selection and vendor evaluation, where we help organizations identify and evaluate technology solutions that best meet their requirements. We conduct thorough assessments of technology options, considering factors including functionality, security, scalability, cost, and vendor support, enabling informed technology procurement decisions.
            </p>

            <p>
              Through our IT consulting, ECX enables organizations to leverage technology as a strategic enabler rather than a cost center, creating technology strategies that drive business value while maintaining security, compliance, and operational efficiency. We understand that successful technology adoption requires careful planning, expert guidance, and ongoing support, providing consulting services that transform technology challenges into competitive advantages.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Explore our IT consulting services →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

