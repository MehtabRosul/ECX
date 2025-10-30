import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Library — Research & Resources | EncryptArx",
	description: "Explore research papers, articles, datasets, and code from EncryptArx.",
};

export default function LibraryPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Library</h1>
				<p className="mt-3 text-muted-foreground">Search research, articles, and datasets.</p>
				<div className="mt-6">
					<input aria-label="Search library" className="w-full rounded-md border bg-background px-3 py-2" placeholder="Search the library..." />
				</div>
			</header>

			<section aria-labelledby="filters" className="mb-8">
				<h2 id="filters" className="sr-only">Filters</h2>
				<div className="flex flex-wrap gap-2">
					{["Paper","Article","Dataset","Blog"].map((t) => (
						<button key={t} className="rounded-full border px-3 py-1 text-sm hover:bg-accent/10" aria-pressed="false">{t}</button>
					))}
				</div>
			</section>

			<section aria-labelledby="results">
				<h2 id="results" className="sr-only">Results</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<article key={i} className="rounded-lg border p-6">
							<p className="text-xs text-muted-foreground">Paper</p>
							<h3 className="mt-1 font-medium">Research Item {i + 1}</h3>
							<p className="mt-2 text-sm text-muted-foreground">Short abstract preview.</p>
							<a href="/library/example" className="mt-3 inline-block text-primary underline underline-offset-4">Open</a>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}


