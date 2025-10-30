import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Partners & Integrations — EncryptArx",
	description: "Partner listings, integration guides, and application form.",
};

export default function PartnersPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Partners & Integrations</h1>
				<p className="mt-3 text-muted-foreground">Strategic partners and integration guides.</p>
			</header>
			<section aria-labelledby="partners" className="mb-10">
				<h2 id="partners" className="text-2xl font-semibold">Strategic Partners</h2>
				<div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="aspect-video rounded-md border bg-muted/20" aria-label={`Partner ${i + 1}`} />
					))}
				</div>
			</section>
			<section aria-labelledby="integrations">
				<h2 id="integrations" className="text-2xl font-semibold">Integrations</h2>
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{["Slack","Splunk","SIEM","KMS"].map((n) => (
						<article key={n} className="rounded-lg border p-6">
							<h3 className="font-medium">{n}</h3>
							<a href="/library" className="mt-3 inline-block text-primary underline underline-offset-4">Docs</a>
						</article>
					))}
				</div>
				<a href="/api/forms/partner" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-white">Apply to partner</a>
			</section>
		</main>
	);
}


