import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Resources & Downloads — EncryptArx",
	description: "Datasheets, whitepapers, and guides (gated or not).",
};

export default function ResourcesPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Resources</h1>
				<p className="mt-3 text-muted-foreground">Browse and download assets.</p>
			</header>
			<section aria-labelledby="grid">
				<h2 id="grid" className="sr-only">Resources</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<article key={i} className="rounded-lg border p-6">
							<p className="text-xs text-muted-foreground">Whitepaper</p>
							<h3 className="mt-1 font-medium">Resource {i + 1}</h3>
							<a href="/api/forms/asset-request" className="mt-3 inline-block text-primary underline underline-offset-4">Download</a>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}


