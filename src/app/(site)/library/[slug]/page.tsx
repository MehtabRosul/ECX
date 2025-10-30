import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	return {
		title: `Library · ${params.slug.replace(/-/g, " ")}`,
		description: "Research asset detail with viewer & citations.",
	};
}

export default function LibraryItemPage({ params }: Params) {
	if (!params?.slug) return notFound();
	return (
		<main className="container mx-auto max-w-5xl px-4 py-12">
			<header className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">{params.slug.replace(/-/g, " ")}</h1>
				<p className="mt-3 text-muted-foreground">Authors · Year · License</p>
				<div className="mt-4 flex gap-3">
					<a href="#viewer" className="rounded-md border px-4 py-2 hover:bg-accent/10">Open in viewer</a>
					<button className="rounded-md bg-primary px-4 py-2 text-white">Download</button>
				</div>
			</header>
			<section id="viewer" className="rounded-lg border p-6" aria-label="Document viewer placeholder">
				<div className="aspect-[4/3] w-full rounded-md bg-muted/30" />
			</section>
		</main>
	);
}


