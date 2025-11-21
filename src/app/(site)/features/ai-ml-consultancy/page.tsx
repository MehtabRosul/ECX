import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI & ML Consultancy | ECX',
  description: 'Learn how ECX provides expert AI and machine learning consultancy to transform business operations through intelligent automation.',
};

export default function AIMLConsultancyPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">AI & ML Consultancy</span>
        </nav>

        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            AI & ML Consultancy
          </h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-xl text-foreground/80">
              Artificial Intelligence and Machine Learning consultancy encompasses the strategic application of intelligent algorithms and data-driven decision-making systems to solve complex business challenges, automate processes, and unlock insights from vast datasets that would be impossible to analyze through traditional computational methods.
            </p>

            <p>
              At EncryptArx (ECX), AI and ML consultancy represents a convergence of advanced algorithmic expertise and practical business acumen, enabling organizations to harness the transformative power of machine intelligence while maintaining security, compliance, and ethical standards. We recognize that successful AI implementation requires not only technical excellence but also careful consideration of data governance, model interpretability, and integration with existing business processes.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-foreground">
              How ECX Delivers AI & ML Consultancy
            </h2>

            <p>
              ECX's AI and ML consultancy services begin with comprehensive business analysis, where we identify opportunities for intelligent automation, predictive analytics, and data-driven optimization. Our team of data scientists and machine learning engineers works closely with stakeholders to understand business objectives, data availability, and success metrics, ensuring that AI solutions deliver measurable value aligned with organizational goals.
            </p>

            <p>
              We specialize in developing custom machine learning models tailored to specific business requirements, utilizing advanced techniques including deep learning, natural language processing, computer vision, and reinforcement learning. Our approach emphasizes model explainability and interpretability, ensuring that AI-driven decisions can be understood, validated, and trusted by business stakeholders and regulatory bodies.
            </p>

            <p>
              ECX integrates security considerations throughout the AI development lifecycle, implementing robust data protection measures, secure model training environments, and privacy-preserving machine learning techniques. We address the unique security challenges associated with AI systems, including adversarial attacks, model poisoning, and data privacy concerns, ensuring that intelligent systems remain secure and reliable.
            </p>

            <p>
              Our AI consultancy extends to MLOps implementation, where we establish robust pipelines for model training, validation, deployment, and monitoring. We help organizations build scalable infrastructure for machine learning operations, enabling continuous model improvement and adaptation to changing business conditions and data distributions.
            </p>

            <p>
              Through our AI and ML consultancy, ECX enables organizations to leverage cutting-edge artificial intelligence technologies while maintaining control, transparency, and security. We understand that successful AI adoption requires careful planning, technical expertise, and ongoing support, creating intelligent solutions that enhance business capabilities while maintaining ethical standards and regulatory compliance.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Discover our AI & ML consultancy offerings →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

