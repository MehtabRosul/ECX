'use client';

import { Reveal } from "@/components/Reveal";
import { ServicesHero } from "@/components/services/hero-v2";
import { DomainSections } from "@/components/services/domain-sections";
import { AdditionalOfferings } from "@/components/services/additional-offerings";
import { EngagementLifecycle } from "@/components/services/engagement-lifecycle";
import { DeliverablesSection } from "@/components/services/deliverables";
import { CrossCuttingSection } from "@/components/services/cross-cutting";
import { FAQSection } from "@/components/services/faq";
import { ServicesCTA } from "@/components/services/cta-v2";
import { ConsultancyAdvisorySection } from "@/components/services/consultancy-advisory";

export default function ServicesPage() {
	return (
		<main className="relative w-full overflow-hidden">
			{/* Animated Dot Background */}
			<div className="fixed inset-0 -z-10 pointer-events-none">
				<div className="absolute inset-0 bg-background" />
				<div id="animated-dots" className="absolute inset-0" />
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
			</div>

			{/* Hero Section */}
			<Reveal className="transform-gpu">
				<ServicesHero />
			</Reveal>

			{/* Service Domains */}
			<Reveal className="transform-gpu">
				<DomainSections />
			</Reveal>

			{/* Additional Offerings */}
			<Reveal className="transform-gpu">
				<AdditionalOfferings />
			</Reveal>

			{/* Cross-Cutting Capabilities */}
			<Reveal className="transform-gpu">
				<CrossCuttingSection />
			</Reveal>

			{/* Engagement Lifecycle */}
			<Reveal className="transform-gpu">
				<EngagementLifecycle />
			</Reveal>

			{/* Standard Deliverables */}
			<Reveal className="transform-gpu">
				<DeliverablesSection />
			</Reveal>

			{/* Consultancy & Strategic Advisory */}
			<Reveal className="transform-gpu">
				<ConsultancyAdvisorySection />
			</Reveal>

			{/* FAQ Section */}
			<Reveal className="transform-gpu">
				<FAQSection />
			</Reveal>

			{/* CTA Section */}
			<Reveal className="transform-gpu">
				<ServicesCTA />
			</Reveal>
		</main>
	);
}
