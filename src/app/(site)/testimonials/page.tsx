import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Testimonials — EncryptArx",
	description: "Customer quotes, video testimonials, and social proof.",
};

export default function TestimonialsPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
				<p className="mt-3 text-muted-foreground">What our customers say.</p>
			</header>
			<section aria-labelledby="grid">
				<h2 id="grid" className="sr-only">Testimonials</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<blockquote key={i} className="rounded-lg border p-6">
							<p className="text-sm">“Great results and strong partnership.”</p>
							<footer className="mt-2 text-xs text-muted-foreground">Client {i + 1}</footer>
						</blockquote>
					))}
				</div>
			</section>
		</main>
	);
}


