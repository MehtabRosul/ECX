import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Press & Media — EncryptArx",
	description: "Press releases, media kit, and press contact.",
};

export default function PressPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Press & Media</h1>
				<p className="mt-3 text-muted-foreground">Releases and media kit access.</p>
			</header>
			<section aria-labelledby="releases" className="mb-10">
				<h2 id="releases" className="text-2xl font-semibold">Latest Releases</h2>
				<div className="mt-6 grid gap-6">
					{Array.from({ length: 4 }).map((_, i) => (
						<article key={i} className="rounded-lg border p-6">
							<h3 className="font-medium">Release {i + 1}</h3>
							<p className="mt-2 text-sm text-muted-foreground">Summary...</p>
							<a href="/press/release" className="mt-3 inline-block text-primary underline underline-offset-4">Open</a>
						</article>
					))}
				</div>
			</section>
			<section aria-labelledby="kit">
				<h2 id="kit" className="text-2xl font-semibold">Media Kit</h2>
				<a href="/api/forms/press" className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-white">Request access</a>
			</section>
		</main>
	);
}


