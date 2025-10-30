import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Security Advisories — EncryptArx",
	description: "Published advisories with severity, impact, and mitigation guidance.",
};

export default function SecurityAdvisoriesIndexPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Security Advisories</h1>
				<p className="mt-3 text-muted-foreground">Filter by severity and browse advisories.</p>
			</header>
			<section aria-labelledby="filters" className="mb-6">
				<h2 id="filters" className="sr-only">Filters</h2>
				<div className="flex flex-wrap gap-2">
					{["Low","Medium","High","Critical"].map((s) => (
						<button key={s} className="rounded-full border px-3 py-1 text-sm hover:bg-accent/10">{s}</button>
					))}
				</div>
			</section>
			<section aria-labelledby="list">
				<h2 id="list" className="sr-only">Advisories</h2>
				<div className="grid gap-6">
					{Array.from({ length: 5 }).map((_, i) => (
						<article key={i} className="rounded-lg border p-6">
							<h3 className="font-medium">ENX-{2025}-{100 + i}</h3>
							<p className="mt-2 text-sm text-muted-foreground">Affected product · Impact summary</p>
							<a href="/security/advisories/example" className="mt-3 inline-block text-primary underline underline-offset-4">View</a>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}


