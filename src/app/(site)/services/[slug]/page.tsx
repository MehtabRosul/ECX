import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const title = `EncryptArx · ${params.slug.replace(/-/g, " ")}`;
	return { title, description: "Service deep-dive, outcomes, and approach." };
}

export default function ServiceDetailPage({ params }: Params) {
	if (!params?.slug) return notFound();
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight capitalize">{params.slug.replace(/-/g, " ")}</h1>
				<p className="mt-3 text-muted-foreground">Problem → Approach → Deliverables</p>
				<a href="/contact" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-white">Request Proposal</a>
			</header>
			<section aria-labelledby="approach" className="grid gap-6 lg:grid-cols-2">
				<div>
					<h2 id="approach" className="text-2xl font-semibold">Our Approach</h2>
					<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
						<li>Discovery & scope</li>
						<li>Assessment & design</li>
						<li>Implementation</li>
						<li>Validation & handoff</li>
					</ul>
				</div>
				<div>
					<h2 className="text-2xl font-semibold">Deliverables</h2>
					<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
						<li>Reports and remediation plan</li>
						<li>Architecture artifacts</li>
						<li>SLA & support options</li>
					</ul>
				</div>
			</section>
		</main>
	);
}


